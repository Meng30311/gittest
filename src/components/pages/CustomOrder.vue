<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <Step/>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in customProducts" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage:`url(${item.imageUrl})`}">
          </div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{item.title}}</a>
            </h5>
            <p class="card-text">{{item.content}}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!item.price"> {{item.origin_price}} 元</div>
              <del class="h6" v-if="item.price">原價 {{item.origin_price}} 元</del>
              <div class="h5" v-if="item.price">現在只要 {{item.price}} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm" @click="getSingle(item.id)">
              <i class="fas fa-spinner fa-spin"
                v-if="status.loadingItem === item.id && status.modal && !status.isCart"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addCart(item.id)">
              <i class="fas fa-spinner fa-spin"
                v-if="status.loadingItem === item.id && !status.modal && status.isCart"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="row mt-4">
            <div class="col-md-4">
              <div class="card">
                <img src="https://images.unsplash.com/photo-1617911167713-d01306e8f35b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="" class="card-img-top">
                <div class="card-body">
                  <h4 class="card-title">46987</h4>
                  <p class="card-text">asdafaf</p>
                  <a href="#"></a>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card">
                <img src="https://images.unsplash.com/photo-1617911167713-d01306e8f35b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="" class="card-img-top">
                <div class="card-body">
                  <h4 class="card-title">46987</h4>
                  <p class="card-text">asdafaf</p>
                  <a href="#"></a>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card">
                <img src="https://images.unsplash.com/photo-1617911167713-d01306e8f35b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="" class="card-img-top">
                <div class="card-body">
                  <h4 class="card-title">46987</h4>
                  <p class="card-text">asdafaf</p>
                  <a href="#"></a>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-md-4">
              <div class="card">
                <img src="https://images.unsplash.com/photo-1617911167713-d01306e8f35b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="" class="card-img-top">
                <div class="card-body">
                  <h4 class="card-title">46987</h4>
                  <p class="card-text">asdafaf</p>
                  <a href="#"></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="row mt-4">
            <div class="col-md-4">
              <div class="card">
                <img src="https://images.unsplash.com/photo-1617911167713-d01306e8f35b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="" class="card-img-top">
                <div class="card-body">
                  <h4 class="card-title">46987</h4>
                  <p class="card-text">asdafaf</p>
                  <a href="#"></a>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card">
                <img src="https://images.unsplash.com/photo-1617911167713-d01306e8f35b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="" class="card-img-top">
                <div class="card-body">
                  <h4 class="card-title">46987</h4>
                  <p class="card-text">asdafaf</p>
                  <a href="#"></a>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card">
                <img src="https://images.unsplash.com/photo-1617911167713-d01306e8f35b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="" class="card-img-top">
                <div class="card-body">
                  <h4 class="card-title">46987</h4>
                  <p class="card-text">asdafaf</p>
                  <a href="#"></a>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-md-4">
              <div class="card">
                <img src="https://images.unsplash.com/photo-1617911167713-d01306e8f35b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="" class="card-img-top">
                <div class="card-body">
                  <h4 class="card-title">46987</h4>
                  <p class="card-text">asdafaf</p>
                  <a href="#"></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <img src="https://images.unsplash.com/photo-1617911167713-d01306e8f35b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" class="d-block w-100" alt="...">
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
    <Page />

    <!--cart-->
    <div class="container mt-5" style="width:60%">
      <table class="table mt-4 table-sm">
        <thead>
          <tr style="font-size:18px">
            <th></th>
            <th class="text-center p-3">品名</th>
            <th class="text-center p-3">數量</th>
            <th class="text-center p-3">單價</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart.carts" :key="item.id" style="font-size:16px">
            <td class="text-center p-3">
              <a href="#" class="btn btn-outline-danger btn-sm" @click.prevent="removeCart(item.id)"><i
                  class="far fa-trash-alt"></i></a>
            </td>
            <td class="text-center p-3">
              {{item.product.title}}
              <div class="text-success" v-if="item.coupon">
                已套用優惠券
              </div>
            </td>
            <td class="text-right p-3">{{item.qty}}</td>
            <td class="text-right p-3">{{item.total}}</td>
          </tr>
        </tbody>
        <tfoot style="font-size:15px">
          <tr>
            <td colspan="3" class="text-right p-3">總計</td>
            <td class="text-right p-3">{{cart.total}}</td>
          </tr>
          <tr v-if="cart.final_total !== cart.total">
            <td colspan="3" class="text-right p-3 text-success">折扣價</td>
            <td class="text-right p-3 text-success">{{cart.final_total}}</td>
          </tr>
        </tfoot>
      </table>
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="請輸入優惠碼" aria-label="Recipient's username"
          aria-describedby="basic-addon2" v-model="coupon_code">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" id="basic-addon2" @click="addCouponCode()">套用優惠碼</button>
        </div>
      </div>
    </div>
    <!--cart-->

    <!--build order-->
    <div class="my-5 row justify-content-center">
      <ValidationObserver v-slot="{ handleSubmit }" tag="div" class="col-md-7">
        <form @submit.prevent="handleSubmit(createOrder)">
          <div class="form-group">
            <label for="useremail">Email</label>
            <ValidationProvider rules="email|required" v-slot="{errors,classes}" name="email">
              <input type="email" class="form-control" name="email" id="useremail" v-model="form.user.email"
                placeholder="請輸入 Email" :class="classes">
              <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div class="form-group">
            <label for="username">收件人姓名</label>
            <ValidationProvider rules="required" v-slot="{errors,classes}">
              <input type="text" class="form-control" name="name" id="username" v-model="form.user.name"
                placeholder="輸入姓名" :class="classes">
              <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div class="form-group">
            <label for="usertel">收件人電話</label>
            <ValidationProvider rules="required|digits:10" v-slot="{errors,classes}">
              <input type="tel" class="form-control" id="usertel" v-model="form.user.tel" placeholder="請輸入電話"
                :class="classes">
              <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div class="form-group">
            <label for="useraddress">收件人地址</label>
            <ValidationProvider rules="required" v-slot="{errors,classes}">
              <input type="text" class="form-control" name="address" id="useraddress" v-model="form.user.address"
                placeholder="請輸入地址" :class="classes">
              <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div class="form-group">
            <label for="comment">留言</label>
            <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
          </div>
          <div class="text-right">
            <button class="btn btn-danger">送出訂單</button>
          </div>
        </form>
      </ValidationObserver>
    </div>
    <!--build order-->

    <!--modal-->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-white">
            <h5 class="modal-title" id="exampleModalLabel">
              {{singleProduct.title}}
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <img :src="singleProduct.imageUrl" alt="" width="100%">
              </div>
              <div class="col-sm-12">
                <div class="form-row mt-2">
                  <div class="form-group col-md-12 d-flex justify-content-between align-items-center">
                    <div class="h5" v-if="!singleProduct.price"> {{singleProduct.origin_price}} 元</div>
                    <del class="h6" v-if="singleProduct.price">原價 {{singleProduct.origin_price}} 元</del>
                    <div class="h5" v-if="singleProduct.price">現在只要 {{singleProduct.price}} 元</div>
                  </div>
                </div>
              </div>
              <div class="col-sm-12">
                <select class="custom-select custom-select-sm" aria-label="Default select example"
                  v-model="singleProduct.num">
                  <option v-for="num in 5" :value="num" :key="num">選購{{num}}{{singleProduct.unit}}</option>
                </select>
              </div>
              <div class="col-sm-12 mt-3 d-flex justify-content-end">
                <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
                  @click="addCart(singleProduct.id,singleProduct.num)">
                  <i class="fas fa-spinner fa-spin"
                    v-if="singleProduct.id === status.loadingItem && status.modal && status.isCart"></i>
                  加到購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--modal-->
  </div>
</template>

<script>
  import Page from '../Pagination'
  import Step from '@/components/pages/Step'
  import $ from 'jquery'

  export default {
    data() {
      return {
        isLoading: false,
        customProducts: {},
        singleProduct: {},
        status: {
          loadingItem: '',
          modal: false,
          isCart: false
        },
        form: {
          user: {
            email: '',
            name: '',
            tel: '',
            address: '',
            message: ''
          }
        },
        cart: {},
        coupon_code: '',
      }
    },
    components: {
      Page,
      Step,
    },
    methods: {
      getCustom(page = 1) {
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;
        const vm = this;
        this.isLoading = true;
        this.$http.get(api).then(response => {
          vm.isLoading = false;
          vm.customProducts = response.data.products;
          vm.$bus.$emit('getPage', response.data.pagination);
        });
      },
      getSingle(id) {
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
        const vm = this;
        this.status.loadingItem = id;
        this.status.modal = true;
        this.status.isCart = false;
        this.$http.get(api).then(response => {
          vm.singleProduct = response.data.product;
          $('#productModal').modal('show');
          vm.status.loadingItem = '';
        });
      },
      addCart(id, qty = 1) {
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        const vm = this;
        const cart = {
          product_id: id,
          qty,
        };
        this.status.loadingItem = id;
        this.status.isCart = true;
        this.$http.post(api, {
          data: cart
        }).then(response => {
          vm.getCart();
          vm.status.loadingItem = '';
          vm.status.isCart = false;
          $('#productModal').modal('hide');
          vm.$bus.$emit('message:push', '新增成功', 'success');
        });
      },
      getCart() {
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        const vm = this;
        if (!vm.status.isCart) {
          vm.isLoading = true
        };
        this.$http.get(api).then(response => {
          vm.isLoading = false;
          vm.cart = response.data.data;
        });
      },
      removeCart(id) {
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
        const vm = this;
        this.isLoading = true;
        this.$http.delete(api).then(response => {
          vm.getCart();
          vm.isLoading = false;
          vm.$bus.$emit('message:push', '刪除成功', 'danger');
        });
      },
      addCouponCode() {
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
        const vm = this;
        const coupon = {
          code: vm.coupon_code
        };
        this.isLoading = true;
        this.$http.post(api, {
          data: coupon
        }).then(response => {
          if (response.data.success) {
            vm.getCart();
            vm.coupon_code = '';
            vm.isLoading = false;
            vm.$bus.$emit('message:push', '套用成功', 'success');
          } else {
            vm.coupon_code = '';
            vm.isLoading = false;
            vm.$bus.$emit('message:push', response.data.message, 'danger');
          };
        });
      },
      createOrder() {
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
        const vm = this;
        const order = vm.form;
        this.isLoading = true;
        this.$http.post(api, {
          data: order
        }).then(response => {
          if (response.data.success) {
            console.log(response.data);
            vm.$router.push(`/customer_checkout/${response.data.orderId}`)
          };
          vm.isLoading = false;
        });
      },
    },
    created() {
      const vm = this;
      vm.getCustom();
      vm.getCart();
      this.$bus.$on('pagination', page => {
        vm.getCustom(page)
      })
    },
  }

</script>
