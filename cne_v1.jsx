(function (thisObj) {

    const comp = app.project.activeItem;
    const ThreeD_SPATIAL = '6413';
    const ThreeD = '6414';
    const TwoD_SPATIAL = '6415';
    const TwoD = '6416';
    const OneD = '6417';
    const Color = '6418';
    var layer_array = []
    var controllerNull;


    function updateDD(arr) {
        arr.removeAll();
        for (var i = 0; i < arr.length; i++) {
            arr.add("item", arr[i]);
        }
        return arr;
    }


    function populateDD(dd, array) {
        dd.removeAll();
        dd.add("item", "Create a New Control Null");
        for (var i = 0; i < array.length; i++) {
            dd.add("item", array[i]);
        }
        return dd;


    }

    function UpdateArrayOnChange(null_settings_dd, update) {
        null_settings_dd.onChange = function () {
            var new_array;
            var update = updateDD();
            if (null_settings_dd.selection == null || null_settings_dd.selection == undefined) {
                new_array = ["Properties Have Individual Controls", "Individual Controls & Parented to Control Layer"];
                update(new_array);
            } else if (null_settings_dd.selection.text == "Create a New Control Null") {
                new_array = ["Properties Have Individual Controls", "Individual Controls & Parented to Control Layer", "Individual Controls & Parented to Average Position Null"];
                update(new_array);
            } else {
                new_array = ["Properties Have Individual Controls", "Individual Controls & Parented to Control Layer"];
                update(new_array);
            }
        };
    }

    function CreateLayerAray() {
        var layer_array = [];
        if (app.project.activeItem instanceof CompItem) {
            for (var i = 1; i <= app.project.activeItem.numLayers; i++) {
                layer_array.push(app.project.activeItem.layer(i).name);
            }
        }
        return layer_array;
    }
    // Any code you write here will execute before the panel is built.

    buildUI(thisObj); // Calling the function to build the panel

    function buildUI(thisObj) {

        var windowName = "Create Control NULL Extended";

        var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("window", windowName, undefined, {
            resizeable: true
        });

        { // Script's UI Code
            // PANEL1
            // ======
            var panel1 = myPanel.add("panel", undefined, undefined, {
                name: "panel1"
            });
            panel1.text = "Control Structure Selection";
            panel1.preferredSize.width = 580;
            panel1.orientation = "column";
            panel1.alignChildren = ["left", "top"];
            panel1.spacing = 10;
            panel1.margins = [5, 20, 5, 5];

            // GROUP1
            // ======
            var group1 = panel1.add("group", undefined, {
                name: "group1"
            });
            group1.preferredSize.width = 450;
            group1.orientation = "row";
            group1.alignChildren = ["left", "center"];
            group1.spacing = 10;
            group1.margins = 0;

            var statictext1 = group1.add("statictext", undefined, undefined, {
                name: "statictext1"
            });
            statictext1.text = "Control Layer Settings";
            statictext1.preferredSize.width = 200;

            var null_settings_dd_array = ["Create a New Control Null", ""];
            var null_settings_dd = group1.add("dropdownlist", undefined, undefined, {
                name: "null_settings_dd",
                items: null_settings_dd_array
            });
            null_settings_dd.selection = 0;
            null_settings_dd.preferredSize.width = 350;

            // GROUP2
            // ======
            var group2 = panel1.add("group", undefined, {
                name: "group2"
            });
            group2.preferredSize.width = 450;
            group2.orientation = "row";
            group2.alignChildren = ["left", "center"];
            group2.spacing = 10;
            group2.margins = 0;

            var statictext2 = group2.add("statictext", undefined, undefined, {
                name: "statictext2"
            });
            statictext2.text = "Position Property Settings";
            statictext2.preferredSize.width = 200;

            var position_settings_dd_array = ["Individual Controls", "Individual Controls & Parented to Null", "Individual Controls & Parented to Average Position Null"];
            var position_settings_dd = group2.add("dropdownlist", undefined, undefined, {
                name: "position_settings_dd",
                items: position_settings_dd_array
            });
            position_settings_dd.selection = 0;
            position_settings_dd.preferredSize.width = 350;

            // GROUP3
            // ======
            var group3 = panel1.add("group", undefined, {
                name: "group3"
            });
            group3.preferredSize.width = 450;
            group3.orientation = "row";
            group3.alignChildren = ["left", "center"];
            group3.spacing = 10;
            group3.margins = 0;

            var statictext3 = group3.add("statictext", undefined, undefined, {
                name: "statictext3"
            });
            statictext3.text = "Other Property Settings";
            statictext3.preferredSize.width = 200;

            var control_structure_dd_array = ["Individual Controller for Each Property", "One Controller per Property of the Same Type"];
            var control_structure_dd = group3.add("dropdownlist", undefined, undefined, {
                name: "control_structure_dd",
                items: control_structure_dd_array
            });
            control_structure_dd.selection = 0;
            control_structure_dd.preferredSize.width = 350;

            // GROUP4
            // ======
            var group4 = panel1.add("group", undefined, {
                name: "group4"
            });
            group4.orientation = "row";
            group4.alignChildren = ["left", "center"];
            group4.spacing = 10;
            group4.margins = 0;

            var create_null_btn = group4.add("button", undefined, undefined, {
                name: "create_null_btn"
            });
            create_null_btn.helpTip = "Create Controls for Selected Properties";
            create_null_btn.text = "Create Controls";
            create_null_btn.preferredSize.width = 150;

            // GROUP5
            // ======
            var group5 = group4.add("group", undefined, {
                name: "group5"
            });
            group5.preferredSize.width = 400;
            group5.orientation = "row";
            group5.alignChildren = ["right", "center"];
            group5.spacing = 10;
            group5.margins = 0;

            var iconbutton1_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%16%00%00%00%16%08%06%00%00%00%C3%84%C2%B4l%3B%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%C3%92%C3%9D~%C3%BC%00%00%01%C2%8EIDAT8%C2%8D%C2%9D%C2%95%C3%8DM%C3%84%40%0C%C2%85%1F%0B%17n%C3%93%01%C3%A9%C2%80)!%1D%C2%90%12%C2%B6%C2%84%C2%94%C2%90%12%C3%B6%C3%8C)%25D%C2%A2%C2%81%C3%90AJ%08%1D%C3%A4%C3%80%C3%9D%C3%88%C3%92%C3%B3%C2%AEeff%05%C2%96%C2%ACD%C3%B3%C3%B3%C2%8D%C3%87%C3%B1s%1ED%04w%2C%03H%7C%C3%AE%00%0E%00%1B%C2%9FuSp%C3%81%C2%93%C2%88L%22%C2%B2%C3%8B%C3%8D%C3%BC%C2%BB%C3%9A%22%22%C3%A7%C3%8A%C3%BE%22X%17%1F%04)%3C%17%0E%1D%08V%5BE%C2%A4%C2%BB%07%C2%9E%C2%B9%C3%B8B%40%C3%ADF%C3%A6%C2%BD%C2%88l%0C%24%C3%97%C3%80%13%C2%A1%C3%95%C3%AB5%C3%92f%C3%B0.%C2%82%7BB%C3%87%3FB%23%7C%C2%8D%C3%A0%C3%95%0F%C3%BE%C3%93-%C2%B8%C3%81%C3%80%C2%99%03%7D%00%0E%C2%8C%C2%A2%C2%96%C3%AB%C2%A10%C2%B7%C3%90a%C2%B9%C3%9D%C3%82%C2%82%C2%8E9%C2%AB%C3%9D%C2%A2we%C2%B7%C2%BA%03%06%C2%8E%C2%A5'%00%3D%C2%805%14%C3%BA%C3%88%C3%A7P%11%C3%80%19%C3%807%C2%80G'%1A8N%3E%C3%B1%25%C2%AAHU%C2%B6%C3%9CQ%C3%97%07%C2%80g%00%C2%B3%1B%C2%B3%C3%B5%C3%A9T%C3%99%04FR3%C2%8D%C3%B8%C2%BD2%C3%B7%05%C2%A0k%C2%81scN%C2%AD%0BQ%C2%9A%C2%BDh%2F91%C2%B2%08%C3%914%C2%BC%C2%B9%C3%8D%25%C2%9B%18%C3%9DV%08%C3%A6%C3%B0%C2%BD!%C2%85%C2%82%C3%9FY-%C2%BF%C3%BA%00%25%7F%C2%AD%C3%99%C2%A0%C3%9E%C3%9D%C3%8A-%11%3C%C2%85E%C2%99%C3%A3%07AS%C3%A8x%C2%97%C2%82%C3%BA%C2%ACq%C3%81%C2%9Ft%14%C2%A2K%04%18%C3%AC%C2%A0%00%C2%A2%C2%98%C3%AC%16%C3%97%C2%9BG%C2%AD%C2%B7%C2%94%C3%96%C3%B2sl%60%C2%A5%C2%AB%C3%97%C3%B2Z%C3%B3%C2%91%C3%90%C2%B9%C3%95%C2%8F%15n-P%C3%93%C3%93%C2%8A%5E%C3%93%C2%A1rV%C2%8B%C3%9F%07%C2%A5%7F%C2%9E%C3%BE%C3%9FT%C3%92%26k%C2%95%C2%A9%2F)%C2%9D%C3%976%C3%B0%0A%C3%A0%C2%93e%17%5BB%11%C3%AC%01%C3%9A%2B%14%12%C3%ABYAZ%C3%AB%C3%BE%C3%80%C2%9B%01%C3%B8%01h%C2%99%0Fp%C2%8Cj%C3%A4%C3%8D%00%00%00%00IEND%C2%AEB%60%C2%82";
            var iconbutton1 = group5.add("iconbutton", undefined, File.decode(iconbutton1_imgString), {
                name: "iconbutton1",
                style: "toolbutton"
            });
            iconbutton1.helpTip = "Refresh List of Layers";
            iconbutton1.text = "Refresh Control Layer List  ";
            //iconbutton1.preferredSize.width = 100;
            //iconbutton1.preferredSize.height = 35;


        } { // if open in VSCode treat as window in ScriptUI Folder treat as Dockable panel
            myPanel.onResizing = myPanel.onResize = function () {
                this.layout.resize();
            };
            if (myPanel instanceof Window) {
                myPanel.center();
                myPanel.show();
            } else {
                myPanel.layout.layout(true);
                myPanel.layout.resize();
            }
        }
        //Create array of Comp layers
        //add array of layers to the dropdown
        populateDD(null_settings_dd, layer_array);

        // reload button
        iconbutton1.onClick = function () {
            if (!(comp && comp instanceof CompItem)) {
                alert("Please select a composition & some properties!");
                return;
            }
            layer_array = CreateLayerAray();
            populateDD(null_settings_dd, layer_array);
        }
        //create Control Null main Script
        create_null_btn.onClick = function () {
            { // Error Alerts
                if (!(comp && comp instanceof CompItem)) {
                    alert("Please select a composition & some properties!");
                    return;
                } else if (comp.selectedLayers.length == 0) {
                    alert("You must select at least one layer & at least one property!")
                    return;
                } else if (comp.selectedProperties.length == 0) {
                    alert('Please select at least one property!');
                    return;
                } else if (position_settings_dd.selection == undefined || position_settings_dd.selection == null) {
                    alert("Please select Position Property Settings!");
                    return;
                } else if (null_settings_dd.selection == undefined || null_settings_dd.selection == null) {
                    alert("Please select Control Layer Settings!");
                    return;
                }
            }
            generateControllerNull(comp.selectedProperties);

            function generateControllerNull(properties) {
                app.beginUndoGroup("Generate Controller Null"); { //Property Type Codes

                    { // Variables 
                        var positionPropNum = [];
                        var positionPropLayerArray = [];
                        var existing_controls = [];
                        var props = properties;
                        var thisEffect;
                    }
                    //Controller Null Selection Options
                    if (comp instanceof CompItem && null_settings_dd.selection.index == 0) {
                        controllerNull = getLayerNamed(comp, "Controller Null");
                        if (controllerNull == null) {
                            controllerNull = comp.layers.addNull(comp.duration);
                            controllerNull.name = "Controller Null";
                        }
                    } else if (comp instanceof CompItem && null_settings_dd.selection > 0) {
                        controllerNull = comp.layer(null_settings_dd.selection);
                    }
                    //Calculate Average Position Null
                    if (position_settings_dd.selection.index == 2) {
                        searchPropsArray(props);
                        createPositionLayersArray(positionPropLayerArray);

                        if (comp instanceof CompItem && positionPropNum.length > 1) {
                            var sum = [0, 0];
                            for (var ii = 0, il = positionPropLayerArray.length; ii < il; ii++) {
                                var temp = positionPropLayerArray[ii];
                                sum += temp.position.valueAtTime(comp.time, false);
                            }
                            var avg = sum / positionPropLayerArray.length;

                            controllerNull.position.setValue(avg); // set Controller Null to the average position
                            controllerNull.name = "Controller Null"
                        }
                    }
                    //loop through selected properties
                    for (var i = 0; i < props.length; i++) {
                        var newProp = props[i].name;
                        var newPropParent = props[i].parentProperty.name;
                        var prefix;
                        if (comp instanceof CompItem) {
                            var layer = comp.layer(LayerParentOfProperty(props[i]).name);
                        }
                        // if a layer is a 2D layer
                        if (props[i].propertyValueType == ThreeD_SPATIAL && layer.threeDLayer == false) {
                            prefix = "2D"
                            // individual controls for each 2D position property is selected
                            if (position_settings_dd.selection.index == 0) {
                                thisEffect = controllerNull.Effects.addProperty("ADBE Point Control");
                                thisEffect.name = layer.name + ">" + props[i].parentProperty.name + ">" + prefix + " " + props[i].name;
                                thisEffect.property("Point").setValue([props[i].value[0], props[i].value[1]]);
                                props[i].expression = 'thisComp.layer("' + controllerNull.name + '").effect("' + thisEffect.name + '")("Point")';
                                // individual controls for 2D position and parenting to Control Null is selected
                            } else if (position_settings_dd.selection.index == 1) {
                                thisEffect = controllerNull.Effects.addProperty("ADBE Point Control");
                                thisEffect.name = layer.name + ">" + props[i].parentProperty.name + ">" + prefix + " " + props[i].name;
                                // when existing layer is selected to house controls, then the same layer cannot be the parent of itself, and it needs a different expression
                                if (layer.name == controllerNull.name) {
                                    //if layer name is the same as controllerNull name then DO NOT PARENT
                                    thisEffect.property("Point").setValue([props[i].value[0], props[i].value[1]]);
                                    // change the expression to reference only the effect on itself, add `value` so that you can move the layer w/o the controller
                                    props[i].expression = 'value+effect("' + thisEffect.name + '")("Point")';
                                    //zero out the position transform so there is no jump
                                    layer.transform.position.setValue([0, 0])
                                    // if the layer parent is the same as the control, then do not parent it, and 
                                } else {
                                    layer.parent = controllerNull;
                                    thisEffect.property("Point").setValue([props[i].value[0], props[i].value[1]]);
                                    props[i].expression = 'thisComp.layer("' + controllerNull.name + '").effect("' + thisEffect.name + '")("Point")';
                                }
                                // create average position Null and parent 2D Positions to it, is selected
                            } else {
                                thisEffect = controllerNull.Effects.addProperty("ADBE Point Control");
                                thisEffect.name = layer.name + ">" + props[i].parentProperty.name + ">" + prefix + " " + props[i].name;
                                layer.parent = controllerNull;
                                thisEffect.property("Point").setValue([props[i].value[0], props[i].value[1]]);
                                props[i].expression = 'thisComp.layer("Controller Null").effect("' + thisEffect.name + '")("Point")';
                            }
                            // if a layer is a 3D layer       
                        } else if (props[i].propertyValueType == ThreeD_SPATIAL) {
                            prefix = "3D"
                            // individual controls for each 3D position property is selected
                            if (position_settings_dd.selection.index == 0) {
                                thisEffect = controllerNull.Effects.addProperty("ADBE Point3D Control");
                                thisEffect.name = layer.name + ">" + props[i].parentProperty.name + ">" + prefix + " " + props[i].name;
                                thisEffect.property("3D Point").setValue([props[i].value[0], props[i].value[1], props[i].value[2]]);
                                props[i].expression = 'thisComp.layer("' + controllerNull.name + '").effect("' + thisEffect.name + '")("3D Point")';
                                // individual controls for 3D position and parenting to Control Null is selected
                            } else if (position_settings_dd.selection.index == 1) {
                                thisEffect = controllerNull.Effects.addProperty("ADBE Point3D Control");
                                thisEffect.name = layer.name + ">" + props[i].parentProperty.name + ">" + prefix + " " + props[i].name;
                                layer.parent = controllerNull;
                                thisEffect.property("3D Point").setValue([props[i].value[0], props[i].value[1], props[i].value[2]]);
                                props[i].expression = 'thisComp.layer("' + controllerNull.name + '").effect("' + thisEffect.name + '")("3D Point")';
                                // create average position Null and parent 3D Positions to it, is selected
                            } else {
                                thisEffect = controllerNull.Effects.addProperty("ADBE Point3D Control");
                                thisEffect.name = layer.name + ">" + props[i].parentProperty.name + ">" + prefix + " " + props[i].name;
                                layer.parent = controllerNull;
                                thisEffect.property("3D Point").setValue([props[i].value[0], props[i].value[1], props[i].value[2]]);
                                props[i].expression = 'thisComp.layer("Position Controller Null").effect("' + thisEffect.name + '")("3D Point")';
                            }
                        } else if (props[i].propertyValueType == ThreeD) {
                            if (control_structure_dd.selection.index == 0) {
                                thisEffect = controllerNull.Effects.addProperty("ADBE Point3D Control");
                                thisEffect.name = layer.name + " ||" + thisEffect.propertyIndex + " " + props[i].name
                                thisEffect.property("3D Point").setValue([props[i].value[0], props[i].value[1], props[i].value[2]]);
                                props[i].expression = 'thisComp.layer("' + controllerNull.name + '").effect("' + thisEffect.name + '")("3D Point")';
                            } else {
                                if (searchArray(existing_controls)) {
                                    thisEffect = controllerNull.Effects(newProp);
                                    thisEffect.name = props[i].name;
                                    thisEffect.property("3D Point").setValue([props[i].value[0], props[i].value[1], props[i].value[2]]);
                                    props[i].expression = 'thisComp.layer("' + controllerNull.name + '").effect("' + thisEffect.name + '")("3D Point")';
                                } else {
                                    thisEffect = controllerNull.Effects.addProperty("ADBE Point3D Control");
                                    thisEffect.name = props[i].name;
                                    existing_controls.push(props[i].name);
                                    thisEffect.property("3D Point").setValue([props[i].value[0], props[i].value[1], props[i].value[2]]);
                                    props[i].expression = 'thisComp.layer("' + controllerNull.name + '").effect("' + thisEffect.name + '")("3D Point")';
                                }
                            }
                        } else if (props[i].propertyValueType == TwoD_SPATIAL) {
                            if (control_structure_dd.selection.index == 0) {
                                thisEffect = controllerNull.Effects.addProperty("ADBE Point Control");
                                thisEffect.name = layer.name + " |" + thisEffect.propertyIndex + "| " + props[i].name
                                thisEffect.property("Point").setValue([props[i].value[0], props[i].value[1]]);
                                props[i].expression = 'thisComp.layer("' + controllerNull.name + '").effect("' + thisEffect.name + '")("Point")';
                            } else {
                                if (searchArray(existing_controls)) {
                                    thisEffect = controllerNull.Effects(newProp);
                                    thisEffect.name = props[i].name;
                                    thisEffect.property("Point").setValue([props[i].value[0], props[i].value[1]]);
                                    props[i].expression = 'thisComp.layer("' + controllerNull.name + '").effect("' + thisEffect.name + '")("Point")';
                                } else {
                                    thisEffect = controllerNull.Effects.addProperty("ADBE Point Control");
                                    thisEffect.name = props[i].name;
                                    existing_controls.push(props[i].name);
                                    thisEffect.property("Point").setValue([props[i].value[0], props[i].value[1]]);
                                    props[i].expression = 'thisComp.layer("' + controllerNull.name + '").effect("' + thisEffect.name + '")("Point")';
                                }
                            }
                        } else if (props[i].propertyValueType == TwoD) {
                            if (control_structure_dd.selection.index == 0) {
                                thisEffect = controllerNull.Effects.addProperty("ADBE Point Control");
                                thisEffect.name = layer.name + " |" + thisEffect.propertyIndex + "| " + props[i].name
                                thisEffect.property("Point").setValue([props[i].value[0], props[i].value[1]]);
                                props[i].expression = 'thisComp.layer("' + controllerNull.name + '").effect("' + thisEffect.name + '")("Point")';
                            } else {
                                if (searchArray(existing_controls)) {
                                    thisEffect = controllerNull.Effects(newProp);
                                    thisEffect.name = props[i].name;
                                    thisEffect.property("Point").setValue([props[i].value[0], props[i].value[1]]);
                                    props[i].expression = 'thisComp.layer("' + controllerNull.name + '").effect("' + thisEffect.name + '")("Point")';
                                } else {
                                    thisEffect = controllerNull.Effects.addProperty("ADBE Point Control");
                                    thisEffect.name = props[i].name;
                                    existing_controls.push(props[i].name);
                                    thisEffect.property("Point").setValue([props[i].value[0], props[i].value[1]]);
                                    props[i].expression = 'thisComp.layer("' + controllerNull.name + '").effect("' + thisEffect.name + '")("Point")';
                                }
                            }
                        } else if (props[i].propertyValueType == Color) {
                            if (control_structure_dd.selection.index == 0) {
                                thisEffect = controllerNull.Effects.addProperty("ADBE Color Control");
                                thisEffect.name = layer.name + " |" + thisEffect.propertyIndex + "| " + props[i].name
                                thisEffect.property("Color").setValue([props[i].value[0], props[i].value[1], props[i].value[2], props[i].value[3]]);
                                props[i].expression = 'thisComp.layer("' + controllerNull.name + '").effect("' + thisEffect.name + '")("Color")';
                            } else {
                                if (searchArray(existing_controls)) {
                                    thisEffect = controllerNull.Effects(newPropParent + " " + newProp);
                                    thisEffect.name = props[i].parentProperty.name + " " + props[i].name;
                                    thisEffect.property("Color").setValue([props[i].value[0], props[i].value[1], props[i].value[2], props[i].value[3]]);
                                    props[i].expression = 'thisComp.layer("' + controllerNull.name + '").effect("' + thisEffect.name + '")("Color")';
                                } else {
                                    thisEffect = controllerNull.Effects.addProperty("ADBE Color Control");
                                    thisEffect.name = props[i].parentProperty.name + " " + props[i].name;
                                    existing_controls.push(thisEffect.name);
                                    thisEffect.property("Color").setValue([props[i].value[0], props[i].value[1], props[i].value[2], props[i].value[3]]);
                                    props[i].expression = 'thisComp.layer("' + controllerNull.name + '").effect("' + thisEffect.name + '")("Color")';
                                }
                            }
                        } else if (props[i].propertyValueType == OneD) {
                            if (props[i].name == "Rotation" || props[i].name == "X Rotation" || props[i].name == "Y Rotation" || props[i].name == "Z Rotation") {
                                if (control_structure_dd.selection.index == 0) {
                                    thisEffect = controllerNull.Effects.addProperty("ADBE Angle Control");
                                    thisEffect.name = layer.name + " |" + thisEffect.propertyIndex + "| " + props[i].name
                                    thisEffect.property("Angle").setValue(props[i].value);
                                    props[i].expression = 'thisComp.layer("' + controllerNull.name + '").effect("' + thisEffect.name + '")("Angle")';
                                } else {
                                    if (searchArray(existing_controls)) {
                                        thisEffect = controllerNull.Effects(newProp);
                                        thisEffect.name = props[i].name;
                                        thisEffect.property("Angle").setValue(props[i].value);
                                        props[i].expression = 'thisComp.layer("' + controllerNull.name + '").effect("' + thisEffect.name + '")("Angle")';
                                    } else {
                                        thisEffect = controllerNull.Effects.addProperty("ADBE Angle Control");
                                        thisEffect.name = props[i].name;
                                        thisEffect.property("Angle").setValue(props[i].value);
                                        existing_controls.push(props[i].name);
                                        props[i].expression = 'thisComp.layer("' + controllerNull.name + '").effect("' + thisEffect.name + '")("Angle")';
                                    }
                                }
                            } else {
                                if (control_structure_dd.selection.index == 0) {
                                    thisEffect = controllerNull.Effects.addProperty("ADBE Slider Control");
                                    thisEffect.name = layer.name + " |" + thisEffect.propertyIndex + "| " + props[i].name
                                    thisEffect.property("Slider").setValue(props[i].value);
                                    props[i].expression = 'thisComp.layer("' + controllerNull.name + '").effect("' + thisEffect.name + '")("Slider")';
                                } else {
                                    if (searchArray(existing_controls)) {
                                        thisEffect = controllerNull.Effects(newProp);
                                        thisEffect.name = props[i].name;
                                        thisEffect.property("Slider").setValue(props[i].value);
                                        props[i].expression = 'thisComp.layer("' + controllerNull.name + '").effect("' + thisEffect.name + '")("Slider")';
                                    } else {
                                        thisEffect = controllerNull.Effects.addProperty("ADBE Slider Control");
                                        thisEffect.name = props[i].name;
                                        existing_controls.push(props[i].name);
                                        thisEffect.property("Slider").setValue(props[i].value);
                                        props[i].expression = 'thisComp.layer("' + controllerNull.name + '").effect("' + thisEffect.name + '")("Slider")';
                                    }
                                }
                            }
                        }
                    }

                    app.endUndoGroup();

                    function getLayerNamed(comp, name) {
                        for (var i = 1; i <= comp.numLayers; i++) {
                            if (comp.layer(i).name == name) {
                                return comp.layer(i);
                            }
                        }
                        return null;
                    }

                    function LayerParentOfProperty(property) {
                        if (property.propertyDepth > 0) {
                            return property.propertyGroup(property.propertyDepth);
                        } else {
                            return property;
                        }
                    }

                    function searchArray(arr, prefix) {
                        var arr;
                        for (ii = 0; ii < arr.length; ii++) {
                            if (newProp == existing_controls[ii] || (newPropParent + " " + newProp) == existing_controls[ii] || (prefix + newProp) == existing_controls[ii]) {
                                return true;
                            }
                        }
                        return false;
                    }

                    function searchPropsArray(arr2) {
                        var ix;
                        for (ix = 0; ix < arr2.length; ix++) {
                            if ("Position" == arr2[ix].name) {
                                positionPropNum.push(arr2[ix])
                            }
                        }
                        return false;
                    }

                    function createPositionLayersArray(positionPropLayerArray) {
                        var iz;
                        for (iz = 0; iz < positionPropNum.length; iz++) {
                            positionPropLayerArray.push(LayerParentOfProperty(positionPropNum[iz]))
                        }
                    }
                }
            }

            populateDD();

            updateDD(position_settings_dd);
        }

        UpdateArrayOnChange(null_settings_dd, updateDD(position_settings_dd));





    }

})
(this);
