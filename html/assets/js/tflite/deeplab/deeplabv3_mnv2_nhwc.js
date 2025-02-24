'use strict';

import {buildConstantByNpy} from '../common/utils.js';

// DeepLab V3 MobileNet V2 model with 'nhwc' input layout
export class DeepLabV3MNV2Nhwc {
  constructor() {
    this.builder_ = null;
    this.graph_ = null;
    this.weightsUrl_ = '../test-data/models/deeplabv3_mnv2_nhwc/weights/';
    this.inputOptions = {
      mean: [127.5, 127.5, 127.5],
      std: [127.5, 127.5, 127.5],
      scaledFlag: false,
      inputLayout: 'nhwc',
      labelUrl: './labels/labels.txt',
      inputDimensions: [1, 513, 513, 3],
      inputResolution: [513, 513]
    };
    this.outputDimensions = [1, 513, 513];
  }

  async buildConv_(
      input, namePrefix, dwBiasSuffix = '', relu6 = true, options = undefined) {
    const prefix = this.weightsUrl_ + namePrefix;
    let weightsName = prefix + '.npy';
    let biasName = prefix + '_bn_offset.npy';
    if (namePrefix.includes('depthwise')) {
      weightsName = prefix + '_depthwise.npy';
      biasName = `${prefix}_${dwBiasSuffix}.npy`;
    } else if (namePrefix === 'logits_semantic') {
      weightsName = prefix + '_Conv2D.npy';
      biasName = prefix + '_biases.npy';
    }
    const weights = await buildConstantByNpy(this.builder_, weightsName);
    const bias = await buildConstantByNpy(this.builder_, biasName);

    if (options !== undefined) {
      options.inputLayout = 'nhwc';
      options.filterLayout = 'ohwi';
      options.autoPad = 'same-upper';
    } else {
      options = {
        inputLayout: 'nhwc',
        filterLayout: 'ohwi',
        autoPad: 'same-upper',
      };
    }
    if (namePrefix.includes('depthwise')) {
      options.filterLayout = 'ihwo';
    }

    const add = this.builder_.add(
        this.builder_.conv2d(input, weights, options),
        this.builder_.reshape(bias, [1, 1, 1, -1]));

    if (relu6) {
      return this.builder_.clamp(
          add,
          {
            minValue: this.builder_.constant(0.),
            maxValue: this.builder_.constant(6.0),
          });
    }
    return add;
  }

  async buildLinearBottleneck_(
      input, nameIndice, dwiseOptions, shortcut = true) {
    const namePrefix = 'MobilenetV2_expanded_conv_' + nameIndice;
    let dwBiasSuffix = 'depthwise_bn_offset';
    if (Number.parseInt(nameIndice) > 6) {
      dwBiasSuffix = 'BatchNorm_FusedBatchNorm';
    }
    const conv1x1Relu6 = await this.buildConv_(
        input, `${namePrefix}_expand_Conv2D`);
    const dwise3x3Relu6 = await this.buildConv_(
        conv1x1Relu6, `${namePrefix}_depthwise`,
        dwBiasSuffix, true, dwiseOptions);
    const conv1x1Linear = await this.buildConv_(
        dwise3x3Relu6, `${namePrefix}_project_Conv2D`, '', false);
    if (shortcut) {
      return this.builder_.add(input, conv1x1Linear);
    }
    return conv1x1Linear;
  }

  async load() {
    const context = navigator.ml.createContext();
    this.builder_ = new MLGraphBuilder(context);
    const strides = [2, 2];
    const input = this.builder_.input('input',
        {type: 'float32', dimensions: this.inputOptions.inputDimensions});
    const conv0 = await this.buildConv_(
        input, 'MobilenetV2_Conv_Conv2D', '', true, {strides});
    const conv1 = await this.buildConv_(
        conv0, 'MobilenetV2_expanded_conv_depthwise',
        'depthwise_bn_offset', true, {groups: 32});
    const conv2 = await this.buildConv_(
        conv1, 'MobilenetV2_expanded_conv_project_Conv2D', '', false);
    const bottleneck0 = await this.buildLinearBottleneck_(
        conv2, '1', {strides, groups: 96}, false);
    const bottleneck1 = await this.buildLinearBottleneck_(
        bottleneck0, '2', {groups: 144});
    const bottleneck2 = await this.buildLinearBottleneck_(
        bottleneck1, '3', {strides, groups: 144}, false);
    const bottleneck3 = await this.buildLinearBottleneck_(
        bottleneck2, '4', {groups: 192});
    const bottleneck4 = await this.buildLinearBottleneck_(
        bottleneck3, '5', {groups: 192});
    const bottleneck5 = await this.buildLinearBottleneck_(
        bottleneck4, '6', {groups: 192}, false);
    const bottleneck6 = await this.buildLinearBottleneck_(
        bottleneck5, '7', {dilations: [2, 2], groups: 384});
    const bottleneck7 = await this.buildLinearBottleneck_(
        bottleneck6, '8', {dilations: [2, 2], groups: 384});
    const bottleneck8 = await this.buildLinearBottleneck_(
        bottleneck7, '9', {dilations: [2, 2], groups: 384});
    const bottleneck9 = await this.buildLinearBottleneck_(
        bottleneck8, '10', {dilations: [2, 2], groups: 384}, false);
    const bottleneck10 = await this.buildLinearBottleneck_(
        bottleneck9, '11', {dilations: [2, 2], groups: 576});
    const bottleneck11 = await this.buildLinearBottleneck_(
        bottleneck10, '12', {dilations: [2, 2], groups: 576});
    const bottleneck12 = await this.buildLinearBottleneck_(
        bottleneck11, '13', {dilations: [2, 2], groups: 576}, false);
    const bottleneck13 = await this.buildLinearBottleneck_(
        bottleneck12, '14', {dilations: [4, 4], groups: 960});
    const bottleneck14 = await this.buildLinearBottleneck_(
        bottleneck13, '15', {dilations: [4, 4], groups: 960});
    const bottleneck15 = await this.buildLinearBottleneck_(
        bottleneck14, '16', {dilations: [4, 4], groups: 960}, false);

    const conv3 = await this.buildConv_(bottleneck15, 'aspp0_Conv2D');
    const averagePool2d = this.builder_.averagePool2d(bottleneck15,
        {windowDimensions: [65, 65], strides: [65, 65], layout: 'nhwc'});
    const conv4 = await this.buildConv_(averagePool2d, 'image_pooling_Conv2D');
    const resample0 = this.builder_.resample(
        conv4, {sizes: [1, 65, 65, 256], mode: 'linear'});
    const concat = this.builder_.concat([resample0, conv3], 3);

    const conv5 = await this.buildConv_(concat, 'concat_projection_Conv2D');
    const conv6 = await this.buildConv_(conv5, 'logits_semantic', '', false);
    const resample1 = this.builder_.resample(
        conv6, {sizes: [1, 65, 65, 21], mode: 'linear'});
    return this.builder_.resample(
        resample1, {sizes: [1, 513, 513, 21], mode: 'linear'});
  }

  build(outputOperand) {
    this.graph_ = this.builder_.build({'output': outputOperand});
  }

  // Release the constant tensors of a model
  dispose() {
    // dispose() is only available in webnn-polyfill
    if (this.graph_ !== null && 'dispose' in this.graph_) {
      this.graph_.dispose();
    }
  }

  compute(inputBuffer, outputBuffer) {
    const inputs = {'input': inputBuffer};
    const outputs = {'output': outputBuffer};
    this.graph_.compute(inputs, outputs);
  }
}
