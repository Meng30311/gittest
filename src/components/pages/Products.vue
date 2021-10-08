<template>
  <div class="mt-4">
    <loading :active.sync="isLoading"></loading>
    <div class="text-right">
      <button class="btn btn-primary" @click="openModal(true)">建立新產品</button>
    </div>
    <div>
      <table class="table mt-4">
        <thead>
          <tr>
            <th width="120">分類</th>
            <th>產品名稱</th>
            <th width="120">原價</th>
            <th width="120">售價</th>
            <th width="100">是否啟用</th>
            <th width="80">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td>{{item.category}}</td>
            <td>{{item.title}}</td>
            <td class="text-right">{{item.origin_price | currency}}</td>
            <td class="text-right">{{item.price | currency}}</td>
            <td>
              <span class="text-success" v-if="item.is_enabled">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <button class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</button>
            </td>
          </tr>
        </tbody>
      </table>
      <Page/>
    </div>
    <!--modal-->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="isNew">新增產品</span>
              <span v-else>編輯產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image" placeholder="請輸入圖片連結"
                    v-model="tempProduct.imageUrl">
                </div>
                <div class="form-group">
                  <label for="customFile">或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                  </label>
                  <input type="file" id="customFile" class="form-control" ref="files" @change="uploadFile()">
                </div>
                <img :src="tempProduct.imageUrl" alt="" width="100%">
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title" placeholder="請輸入標題" v-model="tempProduct.title">
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input type="text" class="form-control" id="category" placeholder="請輸入分類"
                      v-model="tempProduct.category">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input type="unit" class="form-control" id="unit" placeholder="請輸入單位" v-model="tempProduct.unit">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input type="number" class="form-control" id="origin_price" placeholder="請輸入原價"
                      v-model="tempProduct.origin_price">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="number" class="form-control" id="price" placeholder="請輸入售價"
                      v-model="tempProduct.price">
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea type="text" class="form-control" id="description" placeholder="請輸入產品描述"
                    v-model="tempProduct.description"></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea type="text" class="form-control" id="content" placeholder="請輸入產品說明內容"
                    v-model="tempProduct.content"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="is_enabled" v-model="tempProduct.is_enabled"
                      :true-value="1" :false-value="0">
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-danger" data-dismiss="modal" @click="delProduct()"
              v-if="!isNew">刪除產品</button>
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct()">確認</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import $ from 'jquery'
  import Page from '../Pagination'

  export default {
    data() {
      return {
        products: [],
        tempProduct: {},
        isNew: false,
        isLoading: false,
        status: {
          fileUploading: false
        },
      };
    },
    components:{
      Page,
    },
    methods: {
      getProducts(page=1) {
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`;
        const vm = this;
        this.isLoading = true;
        this.$http.get(api).then(response => {
          vm.isLoading = false;
          vm.products = response.data.products;
          console.log(vm.products);
          vm.$bus.$emit('getPage',response.data.pagination);
        });
      },
      openModal(isNew, item) {
        const vm = this;
        if (isNew) {
          vm.tempProduct = {};
          vm.isNew = true;
        } else {
          vm.tempProduct = Object.assign({}, item);
          vm.isNew = false;
        };
        $('#productModal').modal('show');
      },
      updateProduct() {
        let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`;
        let httpMethod = 'post';
        const vm = this;
        if (!vm.isNew) {
          httpMethod = 'put';
          api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        };
        this.$http[httpMethod](api, {
          data: vm.tempProduct
        }).then(response => {
          if (response.data.success) {
            $('#productModal').modal('hide');
            vm.getProducts();
          } else {
            $('#productModal').modal('hide');
            vm.getProducts();
            console.log('新增失敗')
          };
        });
      },
      delProduct() {
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${this.tempProduct.id}`;
        const vm = this;
        this.$http.delete(api).then(response => {
          console.log(response.data);
          vm.getProducts();
        });
      },
      uploadFile() {
        const uploadedFile = this.$refs.files.files[0];
        const vm = this;
        const formData = new FormData();
        formData.append('file-to-upload', uploadedFile);
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
        this.status.fileUploading = true;
        this.$http.post(url, formData, {
          headers: {
            'Content-type': 'multipart/form-data'
          }
        }).then(response => {
          vm.status.fileUploading = false;
          if (response.data.success) {
            vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
          } else {
            vm.$bus.$emit('message:push', response.data.message, 'danger')
          };
        });
      },
    },
    created() {
      const vm=this;
      vm.getProducts();
      this.$bus.$on('pagination', page =>{
        vm.getProducts(page)
      })
    },
  }

</script>
