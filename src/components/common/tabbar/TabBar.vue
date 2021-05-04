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
  background: #f6f6f6;
  height: 49px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -2px 2px rgba(100, 100, 100, 0.1);
}
</style>
