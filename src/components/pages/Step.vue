<template>
  <div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-11 col-sm-9 col-md-7
				col-lg-6 col-xl-5 text-center p-0 mt-3 mb-2">
          <div class="px-0 pt-4 pb-0 mt-3 mb-3">
            <form id="form">
              <ul id="progressbar">
                <li id="step1" :class="{'active':current >= 1}">
                  <strong>Step 1</strong>
                </li>
                <li id="step2" :class="{'active':current >= 2}"><strong>Step 2</strong></li>
                <li id="step3" :class="{'active':current === 3}"><strong>Step 3</strong></li>
              </ul>
              <div class="stepContent">
                <div v-if="current === 1">content1</div>
              </div>
              <div class="fieldset">
                <input type="button" name="next-step" class="next-step" value="Next Step" @click="next()">
                <input type="button" name="previous-step" v-if="current>1" class="previous-step" value="Previous Step"
                  @click="prev()">
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        current: 1,
        step1after: '',
        step2after: '',
      }
    },
    methods: {
      next() {
        const vm = this;
        vm.current++;
        const root = document.documentElement;
        if (vm.current >= 2) {
          vm.step1after = 'rgb(255, 0, 0)';
          root.style.setProperty('--Bgc1', `${vm.step1after}`);
        };
        if (vm.current >= 3) {
          vm.step2after = 'rgb(255, 0, 0)';
          root.style.setProperty('--Bgc2', `${vm.step2after}`);
        };
        console.log(vm.current)
      },
      prev() {
        const vm = this;
        vm.current--;
        const root = document.documentElement;
        if (vm.current < 3) {
          vm.step2after = 'lightgray';
          root.style.setProperty('--Bgc2', `${vm.step2after}`);
        };
        if (vm.current < 2) {
          vm.step1after = 'lightgray';
          root.style.setProperty('--Bgc1', `${vm.step1after}`);
        };
        console.log(vm.current)
      },
    },
    created() {
      const root = document.documentElement;
      root.style.setProperty('--Bgc1', 'lightgray');
      root.style.setProperty('--Bgc2', 'lightgray');
    },
  }

</script>

<style>
  h2 {
    color: #2F8D46;
  }

  #form {
    text-align: center;
    position: relative;
    margin-top: 20px
  }

  .fieldset {
    background: white;
    border: 0 none;
    border-radius: 0.5rem;
    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding-bottom: 20px;
    position: relative
  }

  .finish {
    text-align: center
  }

  #form .previous-step,
  .next-step {
    width: 100px;
    font-weight: bold;
    color: white;
    border: 0 none;
    border-radius: 0px;
    cursor: pointer;
    padding: 10px 5px;
    margin: 10px 5px 10px 0px;
    float: right
  }

  .previous-step {
    background: #616161;
  }

  .next-step {
    background: #2F8D46;
  }

  #form .previous-step:hover,
  #form .previous-step:focus {
    background-color: #000000
  }

  #form .next-step:hover,
  #form .next-step:focus {
    background-color: #2F8D46
  }

  .text {
    color: #2F8D46;
    font-weight: normal
  }

  #progressbar {
    margin-bottom: 30px;
    overflow: hidden;
    color: lightgrey
  }

  #progressbar .active {
    color: #2F8D46
  }

  #progressbar li {
    list-style-type: none;
    font-size: 15px;
    width: 25%;
    float: left;
    position: relative;
    font-weight: 400
  }

  #progressbar #step1:before {
    content: "1"
  }

  #progressbar #step2:before {
    content: "2"
  }

  #progressbar #step3:before {
    content: "3";
  }

  #progressbar li:before {
    width: 50px;
    height: 50px;
    line-height: 45px;
    display: block;
    font-size: 20px;
    color: #ffffff;
    background: lightgray;
    border-radius: 50%;
    margin: 0 auto 10px auto;
    padding: 2px
  }

  #progressbar #step2:after {
    content: '';
    width: 100%;
    height: 2px;
    background: var(--Bgc2);
    position: absolute;
    top: 25px;
    z-index: -1
  }

  #progressbar #step1:after {
    content: '';
    width: 100%;
    height: 2px;
    background: var(--Bgc1);
    position: absolute;
    top: 25px;
    z-index: -1
  }

  .active .check {}

  #progressbar li.active:before,
  #progressbar li.active:after {
    background: #2F8D46
  }

  .progress {
    height: 20px
  }

  .progress-bar {
    background-color: #2F8D46
  }

</style>
