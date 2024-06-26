const { bot } = require("./bot");
const {
  addCategory,
  getCategory,
  deleteCategory,
  editCategory,
} = require("./controller/category.controller");
const {
  add_task_next,
  getTask,
  deleteTask,
  editTask,
  editTaskField,
  updateField,
} = require("./controller/task.controller");
const { ACTION_TYPE } = require("./helpers/action_type");

bot.on("callback_query", async (query) => {
  await bot.answerCallbackQuery(query.id);

  const chatId = query.from.id;
  const data = JSON.parse(query.data);
  console.log(data);

  const { type } = data;
  switch (type) {
    case ACTION_TYPE.ADD_CATEGORY:
      addCategory(chatId);
      break;
    case ACTION_TYPE.SHOW_CATEGORY:
      getCategory(chatId, data.ct_id);
      break;
    case ACTION_TYPE.DELETE_CATEGORY:
      deleteCategory(chatId, data.ct_id, query.message.message_id);
      break;
    case ACTION_TYPE.EDIT_CATEGORY:
      editCategory(chatId, data.ct_id, query.message.message_id);
      break;
    case ACTION_TYPE.ADD_TASK:
      add_task_next(chatId, null, null, data.ct_id);
      break;
    case ACTION_TYPE.CHOOSE_TASK_PRIORITY:
      add_task_next(chatId, data.priority, "priority");
      break;
    case ACTION_TYPE.SHOW_TASK:
      getTask(chatId, data.task_id);
      break;
    case ACTION_TYPE.DELETE_TASK:
      deleteTask(chatId, data.task_id, query.message.message_id);
      break;
    case ACTION_TYPE.EDIT_TASK:
      editTask(chatId, data.task_id);
      break;
    case ACTION_TYPE.EDIT_TASK_FIELD:
      editTaskField(chatId, data.field);
      break;
    case ACTION_TYPE.UPDATE_TASK_FIELD:
      updateField(chatId, data.value);
  }
});
