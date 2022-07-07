const { isModuleNamespaceObject } = require("util/types");

function forms() {
  // Forms

  const forms = document.querySelectorAll("form");

  const message = {
    loading: "Загрузка",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так...",
  };

  forms.forEach((item) => {
    postDate(item);
  });

  function postDate(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      statusMessage.textContent = message.loading;
      form.append(statusMessage);

      const request = new XMLHttpRequest();
      request.open("POST", "server.php");

      // request.setRequestHeader("Content-type", "multipart/form-data");
      const formData = new FormData(form);

      const object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      });

      const json = JSON.stringify(json);
      request.send(formData);

      request.addEventListener("load", () => {
        if (request.status === 200) {
          console.log(request.response);
          showThanks(message.success);
          form.reset();
          statusMessage.remove();
        } else {
          showThanks(message.failure);
        }
      });
    });
  }
  function showThanks(message) {
    const prevModalDialog = document.querySelector(".moodal__dialog");

    prevModalDialog.classList.add("hide");
    openModal();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
        <div class ='modal__content'>
          <div class ='modal__close data-close'>&times;</div>
          <div class ='modal__title'>${message}</div>
        </div>
        `;

    document.querySelector("modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal();
    }, 4000);
  }
}

export default forms;
