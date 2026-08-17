const transporter = document.getElementById("transporter");
const driverContainer = document.getElementById("driver-container");

// Transporter → Driver options
transporter.addEventListener("change", function () {

    if (this.value === "UPS") {

        driverContainer.innerHTML = `
            <select name="driver" id="driver" required>
                <option value="" disabled selected>Driver</option>
                <option value="Vincent">Vincent</option>
                <option value="Daniel">Daniel</option>
            </select>
        `;

    } else if (this.value === "Company VAN") {

        driverContainer.innerHTML = `
            <select name="driver" id="driver" required>
                <option value="" disabled selected>Driver</option>
                <option value="Obed">Obed</option>
                <option value="George">George</option>
            </select>
        `;

    } else if (this.value === "Pickup") {

        driverContainer.innerHTML = `
            <input
                type="text"
                name="driver"
                id="driver"
                placeholder="Driver"
                required
            >
        `;
    }
});


// Driver → Receiver validation
const checkbox = document.getElementById("chk");
const driver = document.querySelector(".driver");

checkbox.addEventListener("change", function () {

    if (this.checked) {

        // Get only the Driver fields
        const driverFields = driver.querySelectorAll("input, select");

        // Check each Driver field
        for (const field of driverFields) {

            if (!field.checkValidity()) {

                // Stop Receiver from opening
                this.checked = false;

                // Show the browser's validation message
                field.reportValidity();

                return;
            }
        }
    }
});


document
  .getElementById("delivery-form")
  .addEventListener("submit", async function (e) {

    e.preventDefault();

    const formData = {
      waybill: "GA0-" + document.querySelector('[name="waybill"]').value,
      deliveryDateTime: document.querySelector('[name="txt"]').value,
      transporter: document.querySelector('[name="transporter"]').value,
      driver: document.querySelector('[name="driver"]').value,
      status: document.querySelector('[name="status"]').value,
      receiverName: document.querySelector('[name="name"]').value,
      contact: "+233" + document.querySelector('[name="contact"]').value
    };

    try {

      const response = await fetch(
        https://script.google.com/macros/s/AKfycbzvK7XIk4sXNuy7oPpyvyHaJLED5RTdUtvQq6BCRLSwmatdSZToh-dgVqlHLM9GOVR08A/exec,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const result = await response.json();

      if (result.result === "success") {

        alert("Delivery submitted successfully!");

        document.getElementById("delivery-form").reset();

        document.getElementById("chk").checked = false;

      }

    } catch (error) {

      console.error(error);

      alert("Submission failed.");

    }

  });
