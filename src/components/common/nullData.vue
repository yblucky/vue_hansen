<template>
 <div class="loading_container">
     <div class="load_img">
        <img src="../../hsimages/null.png" class="vip" />
     </div>
 </div>
</template>

<script>
   export default {
     data(){
           return{

           }
       },
   }
</script>

<style lang="scss" scoped>
   @import '../../style/mixin';

   .loading_container{
      position: fixed;
      top: 40%;
      left: 33%;
      transform: translate(-50%, -50%);
      @include wh(2.5rem, 2.5rem);
   }

</style>
