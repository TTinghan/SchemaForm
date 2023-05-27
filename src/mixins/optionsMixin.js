const optionsMixin = {
  inject: ['elForm'],
  created() {
    const [optionsFn, watchData] = this.options;
    optionsFn && this.initOptoins(optionsFn);
    if (watchData && typeof watchData === 'string') {
      this.$watch('elForm.model.' + watchData, function (newVal, oldVal) {
        this.execFn(optionsFn, newVal, oldVal)
      });
    }
    if (watchData && typeof watchData === 'function') {
      this.$watch(watchData.bind(this, this.elForm.model), function (newVal, oldVal) {
        this.execFn(optionsFn, newVal, oldVal)
      });
    }
  },
  data() {
    return {
      optionLoading: false
    }
  },
  methods: {
    execFn(fn, newVal, oldVal) {
      this.optionLoading = true;
      const _fn = fn.call(this, this.elForm.model, newVal, oldVal);
      this.optionsList = []
      if (_fn?.then) {
        _fn.then(res => {
          this.optionsList = res;
          this.optionLoading = false;
        })
      } else {
        this.optionsList = _fn;
        this.optionLoading = false;
      }
    },
    initOptoins(options) {
      // 第一个参数是函数，就执行，不是函数，那整个options是就是静态的数组
      const optionsType = typeof options;
      if (optionsType === 'function') {
        this.execFn(options);
      } else {
        this.optionsList = this.options;
      }
    }
  }
};

export default optionsMixin;