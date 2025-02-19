<template>
    <div style="width: 100%;height: 100%;">
        <splitpanes class="default-theme" style="height: 100%">
            <pane min-size="20" size="30">左</pane>
            <pane min-size="20" size="70">右</pane>
        </splitpanes>
    </div>
</template>
 
<script setup lang='ts'>
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
</script>
 
<style scoped>
.splitpanes__pane {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: skyblue;
}
</style>