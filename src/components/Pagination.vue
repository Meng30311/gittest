<template>
  <div>
    <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{'disabled': !pagination.has_pre}" @click.prevent="emitPage(pagination.current_page-1)">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item" v-for="page in pagination.total_pages" :key="page"
             :class="{'active': pagination.current_page === page}" @click.prevent="emitPage(page)"><a class="page-link" href="#">{{page}}</a></li>
          <li class="page-item" :class="{'disabled': !pagination.has_next}" @click.prevent="emitPage(pagination.current_page+1)">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
  </div>
</template>

<script>
  export default{
      data(){
          return {
            pagination:{},
          }
      },
      methods:{
          emitPage(page){
              this.$bus.$emit('pagination',page);
          },
      },
      created(){
        const vm=this;  
        this.$bus.$on('getPage',pagination =>{
          vm.pagination=pagination;
        });
      },
  }
</script>