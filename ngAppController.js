ngAppModule.controller('ngAppController', function ($scope, appService, ngNotify) {
    console.log('ngAppController hook');
    // Define basic settings, note target "#ng-notifier" is located in account layout
    // to be able to display a general message box with the entire module but it can be moved to
    // another section or even define a new target for a particular section.
    ngNotify.config({
        theme: 'pastel',
        position: 'top',
        duration: 'f',
        sticky: true,
        html: false,
        target: '#ng-notifier'
    });

    // Declare the array to store results if any
    $scope.formOptions = [];
    $scope.totalOptions = 0; // Max amount of rows to add, 5 for this example
    $scope.template;
    // Create this function to recalculate total when an item has been removed
    $scope.calculateTotal = function () {
        //console.log('hide the button');
        $scope.totalOptions = $scope.formOptions.length;
    };    
    // Add an empty row
    function addRow(template) {
        // Build a template
        var row = {
            "id": 0, "form_type": "Default", "layout_type": template, "formfor": "",
            "Question_text": "Type your question here", "is_hide": "No",
            "is_optional": "No", "options_type": "Yes/No", "display_position": 1
        };
        // Add value to scope
        $scope.formOptions.push(row);
        // Calculate options remaining
        $scope.totalOptions = $scope.formOptions.length;
    };

    // Load Feedback Form options	
    function listOptions(template) {
        //console.log('listOptions hook ' + template);
        //ngNotify.set('listOptions hook !', 'success');
        $formOptions = [
            {
                "id": 1, "form_type": "Default", "layout_type": "template-1", "Question_text": "Question 1", 
                "is_optional": "No", "options_type": "Yes/No", "display_position": "1"
            },
            {
                "id": 2, "form_type": "Default", "layout_type": "template-1", "Question_text": "Question 2", 
                "is_optional": "No", "options_type": "Yes/No", "display_position": "2"
            },
            {
                "id": 3, "form_type": "Default", "layout_type": "template-1", "Question_text": "Question 3",
                "is_optional": "No", "options_type": "Yes/No", "display_position": "3"
            }
        ];
        $scope.formOptions = $formOptions;
        $scope.template = template;        
    };
    
    // Register functions to make them visible to scope    
    $scope.addRow = addRow;
    $scope.listOptions = listOptions;
});