<template>
  <div class="funds-list">
    <!-- 添加按钮和筛选 -->
    <el-form ref="add_data" :model="search_data">
      <div class="search">
        <el-form-item label="按照时间筛选：">
          <el-date-picker
            v-model="search_data.startTime"
            type="datetime"
            placeholder="选择开始时间"
          />
          --
          <el-date-picker
            v-model="search_data.endTime"
            type="datetime"
            placeholder="选择结束时间"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="handleSearch">
            <el-icon><Search /></el-icon>筛选
          </el-button>
        </el-form-item>
      </div>
      <el-form-item class="btnRight">
        <el-button
          type="primary"
          size="small"
          @click="handleAdd"
          v-if="user.identity === 'manager'"
        >
          <el-icon><Plus /></el-icon>添加
        </el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <div class="table_container">
      <el-table :data="currentPageData" style="width: 100%" max-height="450" stripe>
        <el-table-column label="序号" width="70" prop="id" />
        <el-table-column label="创建时间" width="250" prop="createtime">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><Timer /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.createtime }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="收支类型" width="120" prop="type" />
        <el-table-column label="收入" width="100" prop="income">
          <template #default="scope">
            <span style="color: #00d053">{{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column label="支出" width="100" prop="expenditure">
          <template #default="scope">
            <span style="color: #f56767">{{ scope.row.expenditure }}</span>
          </template>
        </el-table-column>
        <el-table-column label="账户现金" width="150" prop="account">
          <template #default="scope">
            <span style="color: #4db3ff">{{ scope.row.account }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" width="150" prop="remark" />
        <el-table-column label="描述" width="130" prop="description" />
        <el-table-column
          label="操作"
          width="180"
          v-if="user.identity === 'manager'"
        >
          <template #default="scope">
            <el-button
              size="small"
              type="warning"
              @click="handleEdit(scope.$index, scope.row)"
            >
              <el-icon><Edit /></el-icon>编辑
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >
              <el-icon><Delete /></el-icon>删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              v-model:current-page="paginations.page_index"
              :page-size="paginations.page_size"
              :page-sizes="paginations.page_sizes"
              :layout="paginations.layout"
              :total="paginations.total"
              @size-change="handleSizeChange"
            />
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 弹窗组件 -->
    <DialogVue
      :dialog="dialog"
      :formData="formData"
      @update="getProfile"
    />

  </div>
</template>

<script setup>
import { Timer, Edit, Delete, Plus, Search } from "@element-plus/icons";
import { ref, onMounted, computed } from "vue";
import { ElMessage } from "element-plus";
import DialogVue from "../components/Dialog.vue";
import { useStore } from "vuex";
import axios from "@/http";

const store = useStore();
const user = computed(() => store.getters.user);

const search_data = ref({ startTime: "", endTime: "" });
const allTableData = ref([]);
const dialog = ref({ show: false, title: "", option: "" });
const formData = ref({
  id: null,
  type: "",
  description: "",
  income: 0,
  expenditure: 0,
  account: 0,
  remark: ""
});

const components = { DialogVue };
const paginations = ref({
  page_index: 1, total: 0, page_size: 5,
  page_sizes: [5, 10, 15, 20],
  layout: "total, sizes, prev, pager, next, jumper"
});

// 当前页数据
const currentPageData = computed(() => {
  const start = (paginations.value.page_index - 1) * paginations.value.page_size;
  const end = start + paginations.value.page_size;
  return allTableData.value.slice(start, end);
});

const handleSizeChange = (size) => {
  paginations.value.page_size = size;
  paginations.value.page_index = 1;
};

// 获取数据
const getProfile = () => {
	// console.log("getProfile called");
  axios.get("fund/allFunds").then(res => {
    allTableData.value = res.data;
    paginations.value.total = allTableData.value.length;
  }).catch(err => {
    console.log(err);
  });
};

// 添加/编辑/删除
const handleAdd = () => {
  dialog.value = { show: true, title: "添加资金信息", option: "add" };
  Object.assign(formData.value, { type: "", description: "", income: "", expenditure: "", account: "", remark: "", id: "" });
};

const handleEdit = (index, row) => {
  dialog.value = { show: true, title: "修改资金信息", option: "edit" };
  Object.assign(formData.value, row);
};

const handleDelete = (index, row) => {
  axios.post(`fund/delete/${row.id}`).then(() => {
    ElMessage.success("删除成功!");
    getProfile();
  });
};

// 搜索
const handleSearch = () => {
  if (!search_data.value.startTime || !search_data.value.endTime) {
    ElMessage.warning("请选择时间区间");
    return getProfile();
  }
  const sTime = new Date(search_data.value.startTime).getTime();
  const eTime = new Date(search_data.value.endTime).getTime();
  allTableData.value = allTableData.value.filter(item => {
    const t = new Date(item.createtime).getTime();
    return t >= sTime && t <= eTime;
  });
  paginations.value.page_index = 1;
  paginations.value.total = allTableData.value.length;
};

onMounted(() => {
  getProfile();
  console.log(currentPageData.value);
});
</script>

<style scoped>
.funds-list { margin-left:10px; padding: 16px; box-sizing: border-box; }
.search { float: left; display: flex; }
.btnRight { float: right; }
.pagination { float: right; margin-top: 10px; }
</style>
