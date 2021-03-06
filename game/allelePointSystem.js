function AllelePointSystem(pos) {
    this.base = new BaseObj(this, 15);
    this.tPos = pos;

    this.pointIndicator = new Label(cloneObject(pos), "");
    this.pointIndicator.color = "blue";
    this.base.addObject(this.pointIndicator);

    this.pointCost = 50;

    this.pointCost = 50;
    var pointCount = 1;
    this.buyButton = new Button(cloneObject(pos), "Buy Point ($" + this.pointCost + ")",
                                this, "buyPoint", { count: pointCount, cost: this.pointCost });
    this.buyButton.tPos.h = 26;
    this.buyButton.tPos.w *= 0.93;
    this.base.addObject(this.buyButton);

    this.pointCost = 350; pointCount = 10;
    this.buyButton2 = new Button(cloneObject(pos), "Buy " + pointCount + " Points ($" + this.pointCost + ")",
                                this, "buyPoint", { count: pointCount, cost: this.pointCost });
    this.buyButton2.tPos.h = 26;
    this.buyButton2.tPos.w *= 0.93;
    this.base.addObject(this.buyButton2);


    this.pointCost = 2500; pointCount = 100;
    this.buyButton3 = new Button(cloneObject(pos), "Buy " + pointCount + " Points ($" + this.pointCost + ")",
                                this, "buyPoint", { count: pointCount, cost: this.pointCost });
    this.buyButton3.tPos.h = 26;
    this.buyButton3.tPos.w *= 0.93;
    this.base.addObject(this.buyButton3);


    this.spendButton = new Button(cloneObject(pos), "Spend Point", this, "spendPoint");
    this.spendButton.tPos.h = 26;
    this.spendButton.tPos.w *= 0.93;    
    
    this.base.addObject(this.spendButton);

    this.trashButton = new Button(cloneObject(pos), "Trash Point", this, "trashPoint");
    this.trashButton.tPos.h = 26;
    this.trashButton.tPos.w *= 0.93;
    this.base.addObject(this.trashButton);
    
    this.autoTrashButton = new RadioButton(cloneObject(pos), "Auto Trash Worse", this, "autoTrashToggle");
    this.autoTrashButton.tPos.h = 26;
    this.autoTrashButton.tPos.w *= 0.93;
    this.base.addObject(this.autoTrashButton);

    this.autoTrashButton.toggle();

    this.pointCost = 50;

    this.buyPoint = function (costData) {
        var selected = this.base.rootNode.selectedObj;

        var cost = costData.cost;
        var count = costData.count;

        if (!cost)
            cost = this.pointCost;

        if (!count)
            count = 1;

        if (selected && selected.base.type == "Tower") {
            if (this.base.rootNode.money > cost) {
                this.base.rootNode.money -= cost;
                for (var i = 0; i < count; i++)
                    selected.generateAllele();
            }
        }
    }

    this.spendPoint = function () {
        var selected = this.base.rootNode.selectedObj;

        if (selected && selected.base.type == "Tower") {
            if (selected.allelesGenerated.length > 0) {
                var allObj = selected.allelesGenerated[0];
                selected.allelesGenerated.splice(0, 1);
                selected.genes.addAllele(allObj.group, allObj.all);
            }
        }
    }

    this.trashPoint = function () {
        var selected = this.base.rootNode.selectedObj;

        if (selected && selected.base.type == "Tower") {
            if (selected.allelesGenerated.length > 0)
                selected.allelesGenerated.splice(0, 1);
        }
    }

    this.autoTrashToggle = function () {
        var selected = this.base.rootNode.selectedObj;

        if (selected && selected.base.type == "Tower") {
            selected.autoTrash = !selected.autoTrash;
        }
    }

    this.doAutoTrash = function () {
        var selected = this.base.rootNode.selectedObj;

        if (selected && selected.base.type == "Tower") {
            var anyPositive = false;

            while (!anyPositive && selected.allelesGenerated.length > 0) {
                this.addDeltaDisplay();

                var extraInfo = this.base.parent.extraInfo;

                anyPositive = false;
                for (var key in extraInfo) {
                    if (extraInfo[key] > 0 || extraInfo[key].added == "+")
                        anyPositive = true;
                    for (var dKey in extraInfo[key].delta)
                        if (extraInfo[key].delta[dKey] > 0)
                            anyPositive = true;
                }
                if (!anyPositive) {
                    selected.allelesGenerated.splice(0, 1);
                }
            }
        }
    }

    this.mouseover = function () { this.addDeltaDisplay(); };
    this.mouseout = function () { this.removeDeltaDisplay(); };

    this.addDeltaDisplay = function () {
        this.base.parent.extraInfo = {};
        var extraInfo = this.base.parent.extraInfo;

        var selected = this.base.rootNode.selectedObj;

        if (selected && selected.base.type == "Tower") {
            if (selected.allelesGenerated.length > 0) {
                var allObj = selected.allelesGenerated[0];

                function addToExtraInfo(allele, factor) {
                    for (var key in allele.delta) {
                        var change = allele.delta[key];

                        if (typeof change == "number") {
                            if (!extraInfo[key])
                                extraInfo[key] = 0;

                            extraInfo[key] += change * factor;

                            //if (!extraInfo[key])
                            //delete extraInfo[key];
                        }
                        else {
                            if (extraInfo[formatToDisplay(change.name)]) {
                                extraInfo[formatToDisplay(change.name)].added = "+-";
                            }
                            else {
                                extraInfo[formatToDisplay(change.name)] = change;
                                extraInfo[formatToDisplay(change.name)].added = factor == 1 ? "+" : "-";
                            }
                        }
                    }
                }

                if (selected.genes.alleles[allObj.group])
                    addToExtraInfo(selected.genes.alleles[allObj.group], -1);

                addToExtraInfo(allObj.all, 1);
            }
        }
    }

    this.removeDeltaDisplay = function () {
        this.base.parent.extraInfo = {};        
    }

    this.update = function () {
        var selected = this.base.rootNode.selectedObj;

        var xPos = this.tPos.x;
        var yPos = this.tPos.y;

        this.pointIndicator.tPos.x = xPos + 10;
        this.pointIndicator.tPos.y = yPos + 20;
        yPos += 28;

        this.buyButton.tPos.x = xPos + 10;
        this.buyButton.tPos.y = yPos;
        yPos += 28;

        this.buyButton2.tPos.x = xPos + 10;
        this.buyButton2.tPos.y = yPos;
        yPos += 28;

        this.buyButton3.tPos.x = xPos + 10;
        this.buyButton3.tPos.y = yPos;
        yPos += 28;

        this.spendButton.tPos.x = xPos + 10;
        this.spendButton.tPos.y = yPos;
        yPos += 28;

        this.trashButton.tPos.x = xPos + 10;
        this.trashButton.tPos.y = yPos;
        yPos += 28;

        this.autoTrashButton.tPos.x = xPos + 10;
        this.autoTrashButton.tPos.y = yPos;
        yPos += 28;

        if (selected)
            this.autoTrashButton.toggled = selected.autoTrash;
        else
            this.autoTrashButton.toggled = false;

        if (this.autoTrashButton.toggled) {
            this.doAutoTrash();
        }

        var selected = this.base.rootNode.selectedObj;

        if (selected && selected.base.type == "Tower") {
            this.base.setAttributeRecursive("hidden", false);
            this.pointIndicator.text = "Allele Points: " + selected.allelesGenerated.length;
        }
        else {
            this.base.setAttributeRecursive("hidden", true);
        }
    }
}