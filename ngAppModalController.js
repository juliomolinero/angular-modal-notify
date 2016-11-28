ngAppModule.controller('ngAppModalController', function ($uibModal, $log, $document, $scope, appService, ngNotify) {

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

    var $ctrl = this;
    $ctrl.animationsEnabled = true;

    // Make deleteOption visible in our view
    $ctrl.deleteOption = function (size, parentSelector, formOptionObject) {

        var parentElem = parentSelector ?
          angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'templates/modal-delete.html',
            controller: 'DeleteOption',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                formOption: function () {
                    return formOptionObject;
                },
                service: function () {
                    return appService;
                },
                scope: function () {
                    return $scope;
                },
                notify: function () {
                    return ngNotify;
                }
            }
        });
    };
    // Make showPreview visible in our view
    $ctrl.showPreview = function (size, parentSelector, template, formOptions) {        
        // Make the template lowercase
        var templateType = template.toLowerCase();
        // Build template name
        var templateName = "modal-" + templateType + ".html";
        /*
    	// Good for testing
    	console.log(layout + '-' + formfor);
    	console.log(formOptions);
    	console.log(templateName);
    	return false;
    	*/
        var parentElem = parentSelector ?
          angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'templates/' + templateName,
            controller: 'PreviewOption',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                formOptionsArray: function () {
                    return formOptions;
                }
            }
        });
    };
});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.
ngAppModule.controller('DeleteOption', function ($uibModalInstance, scope, formOption, service, notify) {
    var $ctrl = this;

    $ctrl.formOption = formOption;

    $ctrl.ok = function () {
        // Call our service to delete item
        service.deleteFormOption(formOption, function (response) {
            notify.set('Option deleted', 'success');
            // Remove the item from view
            for (var i = 0; i < scope.formOptions.length; i++) {
                if (scope.formOptions[i].id === formOption.id) {
                    scope.formOptions.splice(i, 1);
                    break;
                }
            }
            // Calculate total and display button
            scope.$parent.calculateTotal();
        });
        // Close modal pop-up
        $uibModalInstance.close();
    };

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
// Let's show a preview popup
ngAppModule.controller('PreviewOption', function ($uibModalInstance, formOptionsArray) {
    var $ctrl = this;

    $ctrl.formOptions = formOptionsArray;

    $ctrl.ok = function () {
        // Close modal pop-up
        $uibModalInstance.close();
    };
});