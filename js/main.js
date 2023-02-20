var products = [
  {
    ID: 1,
    productName: "Pen - Black, 58",
    productNumber: "R92B",
    color: "Black",
    listPrice: 900.0,
    modifiedDate: "2021-11-11",
  },
  {
    ID: 2,
    productName: "Pen - Silver, 41",
    productNumber: "M945",
    color: "Silver",
    listPrice: 1364.5,
    modifiedDate: "2022-08-16",
  },
  {
    ID: 3,
    productName: "Marker - Red, 62",
    productNumber: "R92R",
    color: "Red",
    listPrice: 1431.5,
    modifiedDate: "2022-02-13",
  },
  {
    ID: 4,
    productName: "Paper - Black, 42",
    productNumber: "R94B",
    color: "Black",
    listPrice: 1349.6,
    modifiedDate: "2021-10-30",
  },
];

function showProducts() {
  for (let product of products) {
    let tr = $("<tr></tr>").addClass("productData");

    let td = $("<td></td>").text(product.productName);
    tr.append(td);

    td = $("<td></td>").text(product.productNumber);
    tr.append(td);

    td = $("<td></td>").text(product.color);
    tr.append(td);

    td = $("<td></td>").text(product.listPrice);
    tr.append(td);

    td = $("<td></td>").text(product.modifiedDate);
    tr.append(td);

    td = $("<td></td>").html(
      `<button type="button" id="editBtn" onclick='Edit(this);' class="btn btn-secondary">Edit</button> <button onclick='deleteRow(this);' class="btn btn-danger">Delete</button>`
    );
    tr.append(td);

    product.tr = tr;
    $("#product").append(tr);
  }
}

showProducts();

/*product filter*/
function filterProduct() {
  let pName = $("#pName").val().toLowerCase();
  let minPrice = $("#minPrice").val();
  let maxPrice = $("#maxPrice").val();

  for (let product of products) {
    let toDisplay =
      (pName.trim() == "" ||
        product.productName.toLowerCase().indexOf(pName) >= 0) &&
      product.listPrice >= minPrice &&
      maxPrice >= product.listPrice;

    let tr = product.tr;

    if (toDisplay) {
      tr.removeClass("fadeOut");
      tr.fadeIn();
    } else {
      tr.addClass("fadeOut");
      tr.fadeOut();
    }
  }
}

$("#btnapply").on("click", filterProduct);

/*show-hide*/
let showFilter = document.getElementById("showFilter");

$(showFilter).click(function () {
  $(this).text($(this).text() == "Show Filter" ? "Hide Filter" : "Show Filter");
});

$("#btnSubmit").click(function (e) {
  const productName = document.getElementById("productName").value;
  const productNumber = document.getElementById("productNumber").value;
  const listPrice = document.getElementById("listPrice").value;

  e.preventDefault(); //prevents it from doing default submit action

  const product = {
    productName: $("#productName").val(),
    productNumber: $("#productNumber").val(),
    color: $("#productColor").val(),
    listPrice: $("#listPrice").val(),
    modifiedDate: $("#modifiedDate").val(),
  };

  let tr = $("<tr></tr>").addClass("productData");

  let td = $("<td></td>").text(product.productName);
  tr.append(td);

  td = $("<td></td>").text(product.productNumber);
  tr.append(td);

  td = $("<td></td>").text(product.color);
  tr.append(td);

  td = $("<td></td>").text(product.listPrice);
  tr.append(td);

  td = $("<td></td>").text(product.modifiedDate);
  tr.append(td);

  td = $("<td></td>").html(
    `<button type="button" id="editBtn" onclick='Edit(this);' class="btn btn-secondary">Edit</button> <button onclick='deleteRow(this);' class="btn btn-danger">Delete</button>`
  );
  tr.append(td);

  product.tr = tr;

  if (productName == "") {
    toastr.error("The Name field is required");
    return false;
  } else if (productNumber == "") {
    toastr.error("The ProductNumber field is required");
    return false;
  } else if (listPrice < 0) {
    toastr.error("the field ListPrice must be between 0.1 and 10000");
    return false;
  } else if (listPrice > 10000) {
    toastr.error("the field ListPrice must be between 0.1 and 10000");
    return false;
  } else if (listPrice == "") {
    toastr.error("the field ListPrice must be between 0.1 and 10000");
    return false;
  } else {
    products.push(product);
    $("#product").append(tr);
  }

  $(this).closest("form").trigger("reset"); //clears the form
});

/*delete product*/
function deleteRow(btn) {
  var cnfrmMessage = confirm(
    "Are you sure want to Delete selected data? You cannot undo this action."
  );
  if (cnfrmMessage == true) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);

    products = products.filter(
      (item) => item.id !== $(row).children()[0].innerText
    );
    toastr.success("Data Deleted Successfuly");
  } else {
    toastr.error("Delete Canceled!");
  }
}

/*Edit button */

function Edit(btn) {
  const tr = btn.parentNode.parentNode;

  if (btn.textContent === "Edit") {
    const span = $(tr).children()[0];
    const input = document.createElement("input");
    input.type = "text";
    input.value = span.textContent;
    input.className = "form-control inputedit";
    tr.insertBefore(input, span);
    tr.removeChild(span);
    btn.textContent = "Save";
  } else if (btn.textContent === "Save") {
    const input = tr.firstElementChild;
    const span = document.createElement("td");
    span.textContent = input.value;
    tr.insertBefore(span, input);
    tr.removeChild(input);
    btn.textContent = "Edit";
  }
}
