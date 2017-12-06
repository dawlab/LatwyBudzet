//MODUŁ BUDGET CONTROLLER 

var budgetController = (function() {

    //Function contructors
    
    var Expense = function(id,description,value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Income = function(id,description,value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    //Zapisywanie wszystkich wydatków i przychodów

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

    return {
        addItem: function(type, des, val) {

            var newItem, ID;
            //Create new ID
            if (data.allItems[type].length == 0) {
                ID = 0;
            } else {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }
           
            // Create new item 
            if (type === "exp") {
                newItem = new Expense (ID, des, val);                
            } else if (type === "inc") {
                newItem = new Income (ID, des, val);                
            }

            // Push it into data structure

            data.allItems[type].push(newItem);

            return newItem;
        },

        testing: function() {
            console.log(data);
        }
    };

})();

// MODUŁ UI CONTROLLER

var UIController = (function() {

    var DOMstrings = {
        inputType: ".add__type",
        description: ".add__description",
        value: ".add__value",
        addItem: ".add__btn",
        incomeContainter: ".income__list",
        expensesContainter: ".expenses__list"
    };
    
    //Pobranie wartości pól przy dodawaniu nowego wydatku lub przychodu
    return {
        getInput: function() {

            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.description).value,
                value: document.querySelector(DOMstrings.value).value
            };
        },

        addListItem: function(obj, type) {

            var html, newHtml, element;
        
            if ( type === 'inc') {

                element = DOMstrings.incomeContainter;

                html = '<div class="item clearfix" id="income-%id&"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {

                element = DOMstrings.expensesContainter;
                

                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            };

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        getDOMstrings: function() {

            return DOMstrings;
        }
    };
}) ();

// MODUŁ GLOBAL APP CONTROLLER

var controller = (function(budgetCtrl, UICtrl) {

    //Skonfigurowanie event listenerów

    var setupEventListeners = function() {

        var DOM = UICtrl.getDOMstrings();
        
        document.querySelector(DOM.addItem).addEventListener('click', CtrlAddItem);
        
        document.addEventListener('keypress', function(e) {
                
            if (e.keyCode === 13) { // 13 is enter
                    CtrlAddItem();
            }
        });
        
     };

     //Dodawanie nowego elementu

   

    var CtrlAddItem = function() {

        var input, addNewItem;
        
        input = UICtrl.getInput();
        addNewItem = budgetCtrl.addItem(input.type, input.description, input.value);
        budgetCtrl.testing();
        UICtrl.addListItem(addNewItem, input.type);           

        
    };

    return {
        init: function() {
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();

