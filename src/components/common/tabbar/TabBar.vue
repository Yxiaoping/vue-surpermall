<template>
    <div id="tab-bar">
        <slot/>
    </div>
</template>

<script>
export default {

}
</script>

<style>
#tab-bar{
  display: flex;
  background: rgb(206, 205, 205);
  height: 49px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -3px 3px rgba(100, 100, 100, 0.2);
}
</style>
