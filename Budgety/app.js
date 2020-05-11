var budgetController = (function(){
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var data = {
        allItems: {
            inc: [],
            exp:[]
        },
        total: {
            inc: 0,
            exp: 0
        }
    }
    return {
        addItem: function(type, desc, value) {
            var newItem, id;
            // Create new id
            if(data.allItems[type].length === 0) {
                id = 0;
            } else {
                id = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }
            // Create new item based on 'exp' or 'inc' type
            if(type === 'exp') {
                newItem = new Expense(id, desc, value);
            } else if(type === 'inc') {
                newItem = new Income(id, desc, value);
            }
            // Push it into our data structure
            data.allItems[type].push(newItem);
            // Return the new element
            return newItem;
            
        },
        testing: function() {
            console.log(data);
        }
    };
 
})();
var UIController = (function(){
    var domStrings = {
        inputType: '.add__type', 
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    }
    return {
        getInput: function() {
            return {
                type: document.querySelector(domStrings.inputType).value, 
                description: document.querySelector(domStrings.inputDescription).value,
                value: document.querySelector(domStrings.inputValue).value
            }     
        },
        getDomStrings: function() {
            return domStrings;
        },
        addListItem: function(object, type) {
            var html, newHtml;
            // Create html string with placeholder text
            if(type === 'inc') {
                element = domStrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if(type === 'exp') {
                element = domStrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
             // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', object.id);
            newHtml = newHtml.replace('%description%', object.description);
            newHtml = newHtml.replace('%value%', object.value);
            
            // Insert html into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        }, 
        clearFields: function() {
            var fields, fieldsArray;
            fields = document.querySelectorAll(domStrings.inputDescription + ',' + domStrings.inputValue);
            fieldsArray = Array.prototype.slice.call(fields);
            fieldsArray.forEach(function(current, index, array) {
                current.value = "";
            });
            fieldsArray[0].focus();
        }
    };
})();
var appController = (function(budgetCtrl, UICtrl){

    var setUpEventListeners = function() {
        var dom = UICtrl.getDomStrings();
        document.querySelector(dom.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function(event) {
            if(event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };
    
    var ctrlAddItem = function() {
        var input, newItem;
        // Get the field input data
        input = UICtrl.getInput();
        // Add the item to a budgetController
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        // Add the item to a UIController
        UICtrl.addListItem(newItem, input.type);
        // Clear the fields
        UICtrl.clearFields();
        // Calculate the budget

        // Display the budget to the UI interface
    };
    return {
        init: function() {
            setUpEventListeners();
        }
        
    };
})(budgetController, UIController);

appController.init();

