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