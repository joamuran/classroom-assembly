
function agendaComponentClass(){
    // Mirar a vore com faig açò en la de classmates
    this.agendaBaseOptions={"assembly":{text: "", img:"assembly.png"},
                            "language":{text: "", img:"language.png"},
                            "writing":{text: "", img:"writing.png"},
                            "reading":{text: "", img:"reading.png"},
                            "library":{text: "", img:"library.png"},
                            "logopedia":{text: "", img:"logopedia.png"},
                            "break":{text: "", img:"break.png"},
                            "games":{text: "", img:"games.png"},
                            "workshop":{text: "", img:"workshop.png"},
                            "physiotherapy":{text: "", img:"physiotherapy.png"},
                            "movie":{text: "", img:"movie.png"},
                            "party":{text: "", img:"party.png"},
                            "excursion":{text: "", img:"excursion.png"},
                            "medicinecabinet":{text: "", img:"medicinecabinet.png"},
                            "agenda":{text: "", img:"agenda.png"},
                            "sport":{text: "", img:"sport.png"},
                            "physicaleducation":{text: "", img:"physicaleducation.png"},
                            "music":{text: "", img:"music.png"},
                            "dinningroom":{text: "", img:"dinningroom.png"},
                            "plastic":{text: "", img:"plastic.png"},
                            "maths":{text: "", img:"maths.png"},
                            "home":{text: "", img:"home.png"},
                            "park":{text: "", img:"park.png"},
                            "town":{text: "", img:"town.png"},
                            "cinema":{text: "", img:"cinema.png"},
                            "restaurant":{text: "", img:"restaurant.png"},
                            "pool":{text: "", img:"pool.png"},
                            "shopping":{text: "", img:"shopping.png"},
                            "cycling":{text: "", img:"cycling.png"},
                            "tv":{text: "", img:"tv.png"},
                            "play":{text: "", img:"play.png"},
                            "sleep":{text: "", img:"sleep.png"},
                            "shower":{text: "", img:"shower.png"},
                            "videogames":{text: "", img:"videogames.png"},
                            "computer":{text: "", img:"computer.png"},
                            "painting":{text: "", img:"painting.png"},
                            "homework":{text: "", img:"homework.png"},
                            "birthday":{text: "", img:"birthday.png"},
                            "travel":{text: "", img:"travel.png"},
                            "hospital":{text: "", img:"hospital.png"},
                            "mall":{text: "", img:"mall.png"},
                            "toylibrary":{text: "", img:"toylibrary.png"}};
    this.name="Activities";
    this.icon="components/componentIcons/agenda.png";
    this.componentname="agenda";
}

agendaComponentClass.prototype=new Component();
agendaComponentClass.prototype.constructor = agendaComponentClass;

agendaComponentClass.prototype.resetComponent=function resetComponent(){
    var self=this;
    self.info=[];
}

agendaComponentClass.prototype.setBaseConfig=function setBaseConfig(){
    var self=this;
    self.info=[];
    self.config=self.agendaBaseOptions;
    //console.log("CONFIG:::::::");
    //console.log(self.config);
};

agendaComponentClass.prototype.drawComponent=function drawComponent(){
    var self=this;
    
    console.log(self);
    
    var li=$(document.createElement("li")).attr("id","agendaComponent").attr("data", JSON.stringify(self.info)).attr("config", JSON.stringify(self.config)).addClass("component");
    
    var agendatext=$(document.createElement("div")).addClass("titleAgendanText textfluid").html(i18n.gettext("agenda.today"));
    $(li).append(agendatext);

    var componentHeight=Math.floor(100/(self.info.length+1));
    
    if (self.info.length===0){
        var span=$(document.createElement("div")).addClass("iconAgendaItemText textfluid").html(textToWrite).attr("fontzoom", "0.5");
        $(span).html(i18n.gettext("No tasks defined for today")).css("top", "40%");
        $(li).append(span);
        return li;
    }
    
    for (var item in self.info){
        
        // Getting text
        var textToWrite=self.config[item].text;
        if (textToWrite=="") textToWrite=i18n.gettext(item);
        
        // Getting Image
        var url_base="components/agenda/img/";
        if (self.config[item].hasOwnProperty("custom") && self.config[item].custom=="true")
        url_base="file:///"+appGlobal.configDir+"/components/agenda/";
        
        var agendaitemText=$(document.createElement("div")).addClass("iconAgendaItemText textfluid").html(textToWrite).attr("fontzoom", "0.5");
        var agendaitem=$(document.createElement("div")).addClass("iconAgendaContent").css("height", componentHeight+"%").css("background-image","url("+url_base+self.config[item].img+")");

        $(agendaitem).append(agendaitemText);
        $(li).append(agendaitem);
    }
    
    
        
    return li;
};

agendaComponentClass.prototype.reDrawComponent=function reDrawComponent(){
    var self=this;
       
    var item=$("#agendaComponent");
    
    $(item).attr("data", JSON.stringify(self.info)).attr("config", JSON.stringify(self.config));
    $(item).empty();
    var agendaicon=self.drawComponent();
    
    // we have to add resizer because we have removed it
    var spanResizer=$(document.createElement("span")).addClass("gs-resize-handle").addClass("gs-resize-handle-both");
    $(item).append($(agendaicon).html()).append(spanResizer);
    
}


agendaComponentClass.prototype.getASDialog=function getASDialog(){
    var sortable=require("sortablejs");
    
    var self=this;
    var ret={"message": i18n.gettext("agenda.component.title")};
    
    var input=$(document.createElement("div")).attr("id", "agendaSelector");
    
    var leftside=$(document.createElement("div")).attr("id", "agendaSelectLeft").addClass("col-md-8 list-group");
    var rightside=$(document.createElement("div")).attr("id", "agendaSelectRight").addClass("col-md-3 col-md-offset-1 list-group");
    
    
    var col_md=2;
    
    // And draw elements
    for (var agenda in self.config){
        if (self.config[agenda].active!="false"){   
            var agendaText=self.config[agenda].text;
            if (self.config[agenda].text==="") agendaText=i18n.gettext(agenda);
            
            // Setting background
            var url_base="components/agenda/img/";
            if (self.config[agenda].hasOwnProperty("custom") && self.config[agenda].custom=="true")
            url_base="file:///"+appGlobal.configDir+"/components/agenda/";
            
            //console.log(agenda);
            var option=$(document.createElement("div")).addClass(agenda).addClass("agendaSelectIcon").attr("agenda",agenda).addClass("list-group-item col-md-"+col_md);
            var text=$(document.createElement("div")).html(agendaText).addClass("agendaSelectInfo");
            //console.log(agendaText);
            $(option).css("background-image", "url("+url_base+self.config[agenda].img+")");
            $(option).append(text);
            
            $(leftside).append(option);
            /*if (typeof(self.info[agenda])=="undefined") $(leftside).append(option);
            else {
                $(rightside).append(option);
                $(option).removeClass("col-md-2").addClass("col-md-12");
                
            }*/
        }
            
    }
    
    $(input).append(leftside);
    $(input).append(rightside);
    
    // Adding to return the content of form
    ret.input=$(input).prop("outerHTML");
    
    //console.log(ret.input);
    
    ret.bindEvents=function(){
        $(".agendaSelectIcon").on("click", function(){

            // Click to select agenda
            $(".agendaSelectIcon").removeClass("agendaSelected");
            $(this).addClass("agendaSelected");
        });
    
        // Fix VEX dialog Settings for fullscreen (a little hack)
        $(".vex-content").addClass("vexExtraWidth");
        $(".vex.vex-theme-default").addClass("vexExtraHeight");
        $(".vex-dialog-input").addClass("vex_dialog_input_maxHeight");
    
        var windowHeight=($($(".vexExtraWidth")[0]).css("height"));
        var newHeight=(windowHeight.substring(0,windowHeight.length-2)-150)+"px";
        console.log(newHeight);
        $("#agendaSelectLeft").css("max-height",newHeight);
        $("#agendaSelectRight").css("max-height",newHeight);
        $(".vex-content.vexExtraWidth").css("top", "50px");
        $(".vexExtraWidth").removeClass("vexExtraWidth").addClass("vexExtraWidthExpanded");
        
        
        for (var item in self.info){
            console.log("***");
            console.log(item);
            var target=$("#agendaSelectLeft [agenda='"+item+"']");
         
            // Prepare to move from leftside
            var width=$(target).css("width");
            var height=$(target).css("height");
            $(target).removeClass("col-md-2").css("width", width).css("height", height).attr("dimensions", '{"width":"'+width+'", "height":"'+height+'"}');
         
            // Moving to rightside
            $("#agendaSelectRight").append(target);
         
            $(target).css("width","").css("height", "");
            $(target).css("width", "100%").addClass("col-md-12");
            
            
        }
        
            
        // Set Sortable    
        sortable.create(agendaSelectLeft, {
                            group: "shared",
                            animation: 150,
                            onAdd: function (evt){
                                console.log('adding right', [evt.item, evt.from]);
                                $(evt.item).css("width","").css("height", "").addClass("col-md-2");
                                },
                            onStart:function (evt){
                                console.log(evt);
                                var width=$(evt.item).css("width");
                                var height=$(evt.item).css("height");
                                $(evt.item).removeClass("col-md-2").css("width", width).css("height", height).attr("dimensions", '{"width":"'+width+'", "height":"'+height+'"}');
                                
                                }
                          });
        
        sortable.create(agendaSelectRight, {
                            group: "shared",
                            animation: 150,
                            onUpdate:function(evt){
                                $(evt.item).css("width","").css("height", "");
                                $(evt.item).css("width", "100%").addClass("col-md-12");
                                },
                            onAdd: function (evt){
                                $(evt.item).css("width","").css("height", "");
                                $(evt.item).css("width", "100%").addClass("col-md-12");
                                },
                            onStart:function (evt){
                                var width=JSON.parse($(evt.item).attr("dimensions")).width;
                                var height=JSON.parse($(evt.item).attr("dimensions")).height;
                                $(evt.item).removeClass("col-md-12").css("width", width).css("height", height);
                                }
                          });
        
        
    
        
    };
    
    ret.processDialog=function(){
        self.info={};
        //var selected=$($(".agendaSelected")[0]).attr("agenda");
        //if (selected) self.info.agenda=selected;
        itemsSelected=$("#agendaSelectRight").find(".agendaSelectIcon");
        //for (var item in itemsSelected){ // DANGEROUS!!!
        for (var i=0; i<itemsSelected.length;i++){  // Better like this
            //console.log($(itemsSelected[i]).attr("agenda"));
            console.log(typeof(self.info));
            console.log(self.info);
            self.info[$(itemsSelected[i]).attr("agenda")]=true;
            //self.info.push($(itemsSelected[i]).attr("agenda"));
        }
        
        self.reDrawComponent();
    };
        
    return ret;
        
    
}


agendaComponentClass.prototype.drawConfigureComponent=function drawConfigureComponent(agenda){
    var self=this;
    
    // Custom components storages images in agenda config path; default components in app path.
    var url_base="components/agenda/img/";
    if (self.config[agenda].hasOwnProperty("custom") && self.config[agenda].custom=="true")
        url_base="file:///"+appGlobal.configDir+"/components/agenda/";
    
    var configRow=$(document.createElement("div")).addClass("agendaConfigItem").addClass("col-md-2").attr("agenda_data", agenda).css("background-image","url("+url_base+self.config[agenda].img+")");
        
        // Add text translated or customized text if exists
        var agendaText=$(document.createElement("div")).addClass("agendaText").html(i18n.gettext(agenda));
        if (self.config[agenda].text!=="") agendaText=self.config[agenda].text;
        
        var text=$(document.createElement("div")).addClass("agendaConfigText").append(agendaText);
   
        var visibilityIcon=$(document.createElement("div")).addClass("visibilityIcon");
        
        var deleteBt=$(document.createElement("div")).addClass("deleteAgendaComponent").attr("delete_target", agenda);
                
        //console.log(self.config[agenda].active);
        
        if (self.config[agenda].active=="false") {
            $(visibilityIcon).addClass("hidenItem");
            var hideparentdiv=$(document.createElement("div")).addClass("hideparentDiv");
            $(configRow).append(hideparentdiv);
        }
        else {
            $(visibilityIcon).addClass("visibleItem");
        }
        //console.log(text);        
        $(configRow).append(text);
        $(configRow).append(visibilityIcon);
        $(configRow).append(deleteBt);
        
        return configRow;
    }

agendaComponentClass.prototype.getConfigDialog=function getConfigDialog(){
    var self=this;
 
    var ret={"message": i18n.gettext("agenda.component.options")};    
    
    var input=$(document.createElement("div")).attr("id", "agendaConfig");
    //for (i in self.agendaOptions){
    for (var agenda in self.config){
        
        var configRow=self.drawConfigureComponent(agenda);
        
        $(input).append(configRow);
        
    }
    
    // Adding new item for add component
    var addConfigBt=$(document.createElement("div")).addClass("agendaConfigItem addNewAgendaComponent").addClass("col-md-2").attr("agenda_data", agenda).css("background-image","url(/css/images/icons/addAlum.png)").attr("id","addNewComponentForAgenda");
    $(input).append(addConfigBt);
    
    
    
    ret.input=$(input).prop("outerHTML");    
    
    ret.bindEvents=function(){
        
        $(".addNewAgendaComponent").on("click", function(){
            // Create new dialog for adding item
            self.showDialogForEditActivity();
            
            });
        
        
        $(".agendaConfigRow").on("click", function(){
            
            if($(this).hasClass("agendaStatusActive")) $(this).removeClass("agendaStatusActive");
            else $(this).addClass("agendaStatusActive");
            });
        
        // Calling to parent class method to bind click event on icon for change its image
        //self.bindClickForChangeImg("agendaConfigIcon");
               
        
        /*$(".agendaConfigIcon").on("click", function(event){
            event.stopPropagation();
            var item=$($(event)[0].target).attr("class").replace("agendaConfigIcon","").replace(" ", "");
            self.changeImage(item, self.componentname);
        });*/
        
        $(".visibilityIcon").on("click", function(e){
            var target=$(e.target);
            if ($(target).hasClass("visibleItem")) {
                $(target).removeClass("visibleItem");
                $(target).addClass("hidenItem");
                var hideparentdiv=$(document.createElement("div")).addClass("hideparentDiv");
                $($(target).parent()).prepend(hideparentdiv);
                
            } else{
                $(target).removeClass("hidenItem");
                $(target).addClass("visibleItem");
                $($($(target).parent()).find(".hideparentDiv")).remove();
                
                }
            
            });
        
        $(".deleteAgendaComponent").on("click", function(ev){
            
            
                vex.dialog.confirm({
                    message: i18n.gettext('ask_delete_agenda_item'),
                    buttons: [
                    $.extend({}, vex.dialog.buttons.YES, {
                        className: 'vex-dialog-button-primary',
                        //text: i18n.gettext("confirm.save.msg.yes"),
                        text: i18n.gettext("yes"),
                        click: function() {
                            var item_to_delete=$(ev.target).attr("delete_target");
                            $("[agenda_data="+item_to_delete+"]").remove();
                            
                            delete self.config[item_to_delete];
                            delete self.info[item_to_delete];
                            
                            $("#agendaComponent").attr("config", JSON.stringify(self.config));
                            $("#agendaComponent").attr("data", JSON.stringify(self.info));
                            
                            self.reDrawComponent();
                            
                            // Saving Assembly
                            appGlobal.saveComponents();
                            //appGlobal.components["agendaComponent"].config["assembly"]
                            
                            
                            //alert("delete!");
                        }}),
                    $.extend({}, vex.dialog.buttons.NO, {
                        className: 'vex-dialog-button',
                        //text: i18n.gettext("confirm.save.msg.cancel"),
                        text: i18n.gettext("no"),
                        click: function() {
                            vex.close(this);
                        }})
                    ],
                    callback: function () {}
                });
            
            
        });
                

        
        
    };
    
    ret.processDialog=function(){
        console.log ($("#agendaComponent").attr("config"));
        
        for (var agenda in self.config){
            var is_active=$(".agendaConfigItem[agenda_data='"+agenda+"']").find(".visibilityIcon").hasClass("visibleItem");
            console.log(agenda+" is "+is_active+" and is "+typeof(is_active));
            self.config[agenda].active=is_active.toString();
            
            //var item="."+agenda+".agendaStatusActive";
            //console.log(item);
            
        }
        
        $("#agendaComponent").attr("config", JSON.stringify(self.config));
        
    // <div class="agendaConfigItem col-md-2" agenda_data="assembly" data="assembly" style="background-image: url(&quot;components/agenda/img/assembly.png&quot;);"><div class="hideparentDiv"></div><div class="agendaConfigText"><div class="agendaText">Assemblea</div></div><div class="visibilityIcon hidenItem"></div></div>
        
        
    };
    
    console.log(ret);
    return ret;
};




agendaComponentClass.prototype.showDialogForEditActivity=function showDialogForEditActivity(name=null, image=null, text=null){
    var self=this;
    var ActName=name;
    var ActImg=image;
    var ActText=text || "";
    var ImgText =i18n.gettext("click.to.select.img");
    
    text="<div id='NewActivityImage'>"+ImgText+"</div>";
    
    
    text+='<label class="form-check-label col-md-12" style="margin-bottom: 16px;"><span name="speakOnShow_label" style="margin-left: 20px;">'+i18n.gettext("new.activity.name")+'</span><input type="text" class="col-md-6" value="'+ActText+'" name="newActName" id="newActName"></div></label>';
    
    text+="<input id='uploadImgForActivity' name='uploadImgForActivity' type='file' style='display:none;'  accept='.jpg, .png, .gif'></input>";
            
    vex.dialog.open({
        message:"Select Image",
        input:text,
        showCloseButton: true,
        /*escapeButtonCloses: true,*/
        buttons:
            [
            $.extend({}, vex.dialog.buttons.YES, {
                className: 'vex-dialog-button-primary',
                text: i18n.gettext("ok")/*,
                click: function() {}*/
            }),
            $.extend({}, vex.dialog.buttons.NO, {
                className: 'vex-dialog-button',
                text: i18n.gettext("cancel"),
                click: function() {
                vex.close(this);    
            

        
            }})
                        
            ],
            /*overlayClosesOnClick: false,*/
            afterOpen: function(){
                
                $("#NewActivityImage").on("click", function(){
                    $("#uploadImgForActivity").click();
                });
                
                $("#uploadImgForActivity").on("change", function(ev){
                    var fse=require("fs-extra");
                    var fs=require("fs");
                    
                    var fullpath=$(ev.target).val();
                    
                    var newNameArray=fullpath.split("/");
                    var newName=newNameArray[newNameArray.length-1];
                    
                    var destPath=appGlobal.configDir+"/components/agenda";
                    var newPath=destPath+"/"+newName;
                    
                    // Create path for agenda customization if not exists
                    if (!fs.existsSync(destPath)){
                        fs.mkdirSync(destPath);
                    }
                    
                    // Check if there is another image with this name
                    if  (fs.existsSync(newPath)){
                                vex.dialog.confirm({
                                    message:i18n.gettext("custom.agenda.image.exists"),
                                    buttons: [
                                        $.extend({}, vex.dialog.buttons.YES, {
                                            className: 'vex-dialog-button-primary',
                                            text: i18n.gettext("yes"),
                                            click: function() {
                                                // If answers yes, overwrite
                                                fse.copySync(fullpath, newPath);
                                                $("#NewActivityImage").attr("imageName", newName).css("background-image", "url(file:///"+newPath+")");
                                            }}),
                                        $.extend({}, vex.dialog.buttons.NO, {
                                            className: 'vex-dialog-button',
                                            text: i18n.gettext("no"),
                                            click: function() {
                                            vex.close(this);
                                            }})
                                        ],
                                    callback: function () {}
                    
                                });
                                
                            } else {
                                console.log(fullpath);
                                console.log(destPath);
                                fse.copySync(fullpath, newPath);
                                $("#NewActivityImage").attr("imageName", newName).css("background-image", "url(file:///"+newPath+")");
                            }
                             return false;
                    
                    
                    
                    

                });
                        
            },
                    
            callback: function(){
                // Image has been saved. Let's create a new item to add to component
                console.log($("#newActName").val());
                console.log($("#NewActivityImage").attr("imageName"));
                
                // Get last id for custom activity
                var num=0;
                var basename="customActivity";
                
                var newid=basename+num.toString();
                
                while (self.config.hasOwnProperty(newid)){
                    num++;
                    newid=basename+num.toString();
                }
                
                // Create item and add to component config
                var newitem={"custom":"true","active":"true","img":$("#NewActivityImage").attr("imageName"),"text":$("#newActName").val() };
                self.config[newid]=newitem;
                
                var item=self.drawConfigureComponent(newid);
                
                console.log(item);
                // Add new item to DOM
                $(item).insertBefore("#addNewComponentForAgenda");
                //document.querySelector("#agendaConfig").insertBefore(item, document.querySelector("#addNewComponentForAgenda"));

                
                //console.log(self.config);
                                     
                
                
            }
        });
            
}