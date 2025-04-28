// Получаем необходимые элементы DOM
const input = document.querySelector("[data-text-field]");
const addTodoBtn = document.querySelector("[data-add-todo-btn]");
const container = document.querySelector("[data-todo-container]");

// Инициализируем список задач из localStorage или создаем пустой массив, если данных нет
const todoList = JSON.parse(localStorage.getItem("todos")) || [];

// Функция для сохранения списка задач в localStorage
// По умолчанию использует ключ "todos", но можно передать другой
const saveToLocalStorage = (key = "todos") => {
  localStorage.setItem("todos", JSON.stringify(todoList));
};

// Обработчик клика по кнопке добавления задачи
addTodoBtn.addEventListener("click", () => {
  // Проверяем, что поле ввода не пустое (убираем пробелы по краям)
  if (input.value.trim()) {
    // Добавляем новую задачу в список
    todoList.push(input.value);
    // Очищаем поле ввода
    input.value = "";

    // Сохраняем обновленный список в localStorage
    saveToLocalStorage();
    render();
  }
});

// Вспомогательная функция для создания элементов с текстовым содержимым
const createElement = (tagName, textContent) => {
  const element = document.createElement(tagName);
  element.textContent = textContent;

  return element;
};

const removeTodo = (index) => {
  todoList.splice(index, 1);
  saveToLocalStorage();
  render();
};

// Функция отрисовки всего списка задач на странице
const render = () => {
  // Очищаем контейнер перед отрисовкой
  container.innerHTML = "";
  // Проходим по каждой задаче в списке
  todoList.forEach((todo, index) => {
    // Создаем новый элемент для задачи и кнопку удаления
    const todoElement = createElement("div", todo);
    const removeBtn = createElement("button", "❌");

    removeBtn.addEventListener("click", () => removeTodo(index));

    todoElement.classList.add("todo-item");
    todoElement.append(removeBtn);
    // Добавляем элемент задачи в контейнер
    container.append(todoElement);
  });
};

// Выполняем первоначальную отрисовку списка при загрузке страницы
render();
