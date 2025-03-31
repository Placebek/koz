<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-[#E3FDFD] p-[15vh]">
    <div class="bg-[#A6E3E9] p-8 rounded-lg shadow-lg w-full max-w-lg">
      <h1 class="text-3xl text-gray-800 font-semibold mb-6 text-center">Создать комнату</h1>
      <form @submit.prevent="submitForm" class="space-y-6" enctype="multipart/form-data">
        <div>
          <label for="name_room" class="block text-gray-700 mb-1">Название комнаты</label>
          <input
            id="name_room"
            v-model="form.name_room"
            type="text"
            placeholder="Введите название"
            class="w-full px-4 py-2 bg-[#E3FDFD] rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>
        <div>
          <label for="max_clients" class="block text-gray-700 mb-1">Максимум клиентов</label>
          <input
            id="max_clients"
            v-model.number="form.max_clients"
            type="number"
            min="0"
            placeholder="Введите число"
            class="w-full px-4 py-2 bg-[#E3FDFD] rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>
        <div class="space-y-4">
          <h2 class="text-xl text-gray-800 font-semibold">Задачи</h2>
          <div v-for="(task, index) in form.tasks" :key="index" class="space-y-2">
            <div>
              <label :for="'task_name_' + index" class="block text-gray-700 mb-1">Название задачи {{ index + 1 }}</label>
              <input
                :id="'task_name_' + index"
                v-model="task.name"
                type="text"
                placeholder="Введите название задачи"
                class="w-full px-4 py-2 bg-[#E3FDFD] rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>
            <div>
              <label :for="'task_file_' + index" class="block text-gray-700 mb-1">Файл (PNG)</label>
              <input
                :id="'task_file_' + index"
                type="file"
                accept="image/png"
                @change="handleFileChange($event, index)"
                class="w-full px-4 py-2 bg-[#E3FDFD] rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300"
                required
              />
              <div v-if="task.preview" class="mt-2">
                <img
                  :src="task.preview"
                  alt="Превью задачи"
                  class="max-w-full h-auto rounded shadow-md"
                />
              </div>
            </div>
            <button
              type="button"
              @click="removeTask(index)"
              class="text-red-600 hover:text-red-800 transition-colors"
            >
              Удалить задачу
            </button>
          </div>
          <button
            type="button"
            @click="addTask"
            class="w-full py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            Добавить задачу
          </button>
        </div>
        <button
          type="submit"
          class="w-full py-2 bg-[#71C9CE] text-white rounded hover:bg-gray-700 transition-colors"
        >
          Создать
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useRouter, useNuxtApp } from 'nuxt/app';
import { createRoom } from '~/api/room';

export default {
  setup() {
    const router = useRouter();
    const { $api } = useNuxtApp(); 
    return { router, $api };
  },
  data() {
    return {
      form: {
        name_room: '',
        max_clients: 0,
        tasks: [{ name: '', file: null, preview: null }],
      },
    };
  },
  methods: {
    addTask() {
      this.form.tasks.push({ name: '', file: null, preview: null });
    },
    removeTask(index) {
      if (this.form.tasks.length > 1) {
        if (this.form.tasks[index].preview) {
          URL.revokeObjectURL(this.form.tasks[index].preview);
        }
        this.form.tasks.splice(index, 1);
      }
    },
    handleFileChange(event, index) {
      const file = event.target.files[0];
      if (file && file.type === 'image/png') {
        if (this.form.tasks[index].preview) {
          URL.revokeObjectURL(this.form.tasks[index].preview);
        }
        this.form.tasks[index].file = file;
        this.form.tasks[index].preview = URL.createObjectURL(file);
      } else {
        alert('Пожалуйста, выберите файл в формате PNG');
        event.target.value = '';
      }
    },
    async submitForm() {
      const formData = new FormData();

      formData.append('name_room', this.form.name_room);
      formData.append('max_clients', this.form.max_clients);

      this.form.tasks.forEach((task, index) => {
        formData.append(`tasks[${index}][name]`, task.name);
        if (task.file) {
          formData.append(`tasks[${index}][file]`, task.file);
        }
      });

      try {
        const response = await createRoom(formData, this.$api);
        console.log('Комната создана:', response);

        this.form.tasks.forEach((task) => {
          if (task.preview) {
            URL.revokeObjectURL(task.preview);
          }
        });

        this.router.push('/');
      } catch (error) {
        alert('Ошибка при создании комнаты: ' + (error.response?.data?.message || error.message));
      }
    },
  },
};
</script>
