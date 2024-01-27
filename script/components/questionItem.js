import { questionItemInput } from "./questionItemInput.js";

const radioInput = new Map([
  ["Pasti", 1],
  ["Sangat Yakin", 0.8],
  ["Yakin", 0.6],
  ["Cukup Yakin", 0.4],
  ["Sedikit Yakin", 0.2],
  ["Tidak Yakin", 0],
]);

const questionItem = (question, index) => {
  const section = document.createElement("section");
  const divQuestion = document.createElement("div");
  const strong = document.createElement("h3");

  const classNameContainer = `question-section`;
  const className = `question-${index}`;

  section.classList.add(classNameContainer);
  divQuestion.classList.add(className);
  strong.textContent = question;
  divQuestion.appendChild(strong);

  section.appendChild(divQuestion);
  for (const [radio, value] of radioInput) {
    const div = questionItemInput(
      className,
      `${className}-${radio}`,
      value,
      radio
    );

    section.appendChild(div);
  }

  return section;
};

export { questionItem };
