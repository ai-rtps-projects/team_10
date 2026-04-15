const chatLog = document.getElementById("chat-log");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const quickButtons = document.querySelectorAll(".quick-btn");

const knowledgeBase = [
  {
    keywords: ["document", "apply", "application", "passport", "license", "certificate", "id"],
    response:
      "For document applications, start by checking the required form, identity proof, address proof, and any supporting certificates. Then submit the application online or at the service center, pay the fee if needed, and keep the reference number for tracking."
  },
  {
    keywords: ["tax", "return", "filing", "income", "refund"],
    response:
      "For tax-related help, keep your ID number, income details, deduction records, and bank details ready. A typical process is: verify your profile, choose the filing form, enter income and deduction details, review the summary, and submit before the deadline."
  },
  {
    keywords: ["eligibility", "eligible", "qualify", "requirement", "requirements"],
    response:
      "Eligibility usually depends on age, income, residency, category, or supporting documents. To confirm eligibility, compare your details with the official scheme requirements and keep proof documents ready before starting the application."
  },
  {
    keywords: ["status", "track", "tracking", "reference", "pending"],
    response:
      "To track an application, use the application or reference number on the official portal. If the status is pending, check whether any document resubmission or verification step is required."
  },
  {
    keywords: ["office", "hours", "contact", "helpline", "center"],
    response:
      "For office support, check the official department portal for working hours, helpline numbers, email support, and nearby service centers. Many services also provide appointment booking to reduce waiting time."
  }
];

function addMessage(role, text) {
  const message = document.createElement("div");
  message.className = `message ${role}`;
  message.textContent = text;
  chatLog.appendChild(message);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function getBotResponse(input) {
  const normalized = input.toLowerCase();

  for (const item of knowledgeBase) {
    if (item.keywords.some(keyword => normalized.includes(keyword))) {
      return item.response;
    }
  }

  if (normalized.includes("hello") || normalized.includes("hi")) {
    return "Hello. I can help with document applications, tax guidance, eligibility checks, and status tracking. Tell me what service you need.";
  }

  return "I can help with document applications, tax information, eligibility requirements, and application tracking. Please ask about one of those topics, and I will guide you step by step.";
}

function sendMessage(messageText) {
  const trimmed = messageText.trim();
  if (!trimmed) return;

  addMessage("user", trimmed);
  const reply = getBotResponse(trimmed);

  setTimeout(() => {
    addMessage("bot", reply);
  }, 250);
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendMessage(userInput.value);
  userInput.value = "";
  userInput.focus();
});

quickButtons.forEach(button => {
  button.addEventListener("click", () => {
    const prompt = button.dataset.prompt || "";
    sendMessage(prompt);
  });
});

addMessage(
  "bot",
  "Welcome to GovAssist Bot. Ask me about document applications, tax information, eligibility rules, or how to track your service request."
);
