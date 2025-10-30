(function(){
      emailjs.init("TmMyXzEh0wMxTkn5N"); // e.g. public_2r2avaSWWCbt2IsNW
  })();
function addtocart(serviceName, servicePrice, ID) {
    const table =  document.getElementById("tablebody");
    const change = document.getElementById(ID);
    const total = document.getElementById("totalamount");

    if (change.innerText === "Remove Item") {
        change.innerText = "Add to cart";
        change.className = "bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-blue-200";

        // Update total
        let currentTotal = parseInt(total.innerText.replace("₹", ""));
        currentTotal -= parseInt(servicePrice);
        total.innerText = "₹" + currentTotal;

        // Find the row corresponding to this item and remove it
        const rows = table.rows;
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].cells[1].innerText === serviceName) { // match service name
                table.deleteRow(i);
                break;
            }
        }

        // Update S.No
        for (let i = 0; i < table.rows.length; i++) {
            table.rows[i].cells[0].innerText = i + 1;
        }

        return;
    }
    let currentTotal = parseInt(total.innerText.replace("₹", ""));
    currentTotal += parseInt(servicePrice);
    total.innerText = "₹" + currentTotal;

    change.innerText = "Remove Item";
    change.className = "bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm hover:bg-red-200";


    const row = table.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);

    cell1.innerText = table.rows.length - 1;
    cell2.innerText = serviceName;
    cell3.innerText = servicePrice;

    for (let i = 0; i < table.rows.length; i++) {
        table.rows[i].cells[0].innerText = i + 1;
    }

    cell3.className = "text-right";
}
$("#bookingform").on("submit", function(e){
    e.preventDefault(); // Prevent form submission
      const userEmail = $("#email").val();
      const name = $("#name").val();

      // ✅ Send the email via EmailJS
      emailjs.send("service_0x51frl", "template_yyupxlx", {
          to_email: userEmail, // must match your template variable 
          name: name,
          time: new Date().toLocaleString(),
          status: "Booked Successfully",
      }).then(function(response){
          alert("Email sent successfully!");
          console.log("SUCCESS!", response);
      }).catch(function(error){
          alert("Failed to send email. Please try again.");
          console.error("FAILED...", error);
      });
});