<script src="//unpkg.com/vue/dist/vue.js

"></script>
<script src="//unpkg.com/element-ui@1.4.2/lib/index.js

"></script>
<div id="app">
<el-progress :text-inside="true" :stroke-width="18" :percentage="0"></el-progress>
<el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
<el-progress :text-inside="true" :stroke-width="18" :percentage="100" status="success"></el-progress>
<el-progress :text-inside="true" :stroke-width="18" :percentage="50" status="exception"></el-progress>
</div>
