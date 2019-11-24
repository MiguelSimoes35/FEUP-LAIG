var DEGREE_TO_RAD = Math.PI / 180;

// Order of the groups in the XML document.
var SCENE_INDEX = 0;
var VIEWS_INDEX = 1;
var GLOBALS_INDEX = 2;
var LIGHTS_INDEX = 3;
var TEXTURES_INDEX = 4;
var MATERIALS_INDEX = 5;
var TRANSFORMATIONS_INDEX = 6;
var ANIMATIONS_INDEX = 7;
var PRIMITIVES_INDEX = 8;
var COMPONENTS_INDEX = 9;

/**
 * MySceneGraph class, representing the scene graph.
 */
class MySceneGraph {
    /**
     * @constructor
     */
    constructor(filename, scene) {
        this.loadedOk = null;

        // Establish bidirectional references between scene and graph.
        this.scene = scene;
        scene.graph = this;

        this.nodes = [];

        this.idRoot = null;                    // The id of the root element.

        this.axisCoords = [];
        this.axisCoords['x'] = [1, 0, 0];
        this.axisCoords['y'] = [0, 1, 0];
        this.axisCoords['z'] = [0, 0, 1];

        // File reading 
        this.reader = new CGFXMLreader();

        /*
         * Read the contents of the xml file, and refer to this class for loading and error handlers.
         * After the file is read, the reader calls onXMLReady on this object.
         * If any error occurs, the reader calls onXMLError on this object, with an error message
         */
        this.reader.open('scenes/' + filename, this);
    }

    /*
     * Callback to be executed after successful reading
     */
    onXMLReady() {
        this.log("XML Loading finished.");
        var rootElement = this.reader.xmlDoc.documentElement;

        // Here should go the calls for different functions to parse the various blocks
        var error = this.parseXMLFile(rootElement);

        if (error != null) {
            this.onXMLError(error);
            return;
        }

        this.loadedOk = true;

        // As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
        this.scene.onGraphLoaded();
    }

    /**
     * Parses the XML file, processing each block.
     * @param {XML root element} rootElement
     */
    parseXMLFile(rootElement) {
        if (rootElement.nodeName != "lxs")
            return "root tag <lxs> missing";

        var nodes = rootElement.children;

        // Reads the names of the nodes to an auxiliary buffer.
        var nodeNames = [];

        for (var i = 0; i < nodes.length; i++) {
            nodeNames.push(nodes[i].nodeName);
        }

        var error;

        // Processes each node, verifying errors.

        // <scene>
        var index;
        if ((index = nodeNames.indexOf("scene")) == -1)
            return "tag <scene> missing";
        else {
            if (index != SCENE_INDEX)
                this.onXMLMinorError("tag <scene> out of order " + index);

            //Parse scene block
            if ((error = this.parseScene(nodes[index])) != null)
                return error;
        }

        // <views>
        if ((index = nodeNames.indexOf("views")) == -1)
            return "tag <views> missing";
        else {
            if (index != VIEWS_INDEX)
                this.onXMLMinorError("tag <views> out of order");

            //Parse views block
            if ((error = this.parseView(nodes[index])) != null)
                return error;
        }

        // <globals>
        if ((index = nodeNames.indexOf("globals")) == -1)
            return "tag <globals> missing";
        else {
            if (index != GLOBALS_INDEX)
                this.onXMLMinorError("tag <globals> out of order");

            //Parse globals block
            if ((error = this.parseGlobals(nodes[index])) != null)
                return error;
        }

        // <lights>
        if ((index = nodeNames.indexOf("lights")) == -1)
            return "tag <lights> missing";
        else {
            if (index != LIGHTS_INDEX)
                this.onXMLMinorError("tag <lights> out of order");

            //Parse lights block
            if ((error = this.parseLights(nodes[index])) != null)
                return error;
        }
        // <textures>
        if ((index = nodeNames.indexOf("textures")) == -1)
            return "tag <textures> missing";
        else {
            if (index != TEXTURES_INDEX)
                this.onXMLMinorError("tag <textures> out of order");

            //Parse textures block
            if ((error = this.parseTextures(nodes[index])) != null)
                return error;
        }

        // <materials>
        if ((index = nodeNames.indexOf("materials")) == -1)
            return "tag <materials> missing";
        else {
            if (index != MATERIALS_INDEX)
                this.onXMLMinorError("tag <materials> out of order");

            //Parse materials block
            if ((error = this.parseMaterials(nodes[index])) != null)
                return error;
        }

        // <transformations>
        if ((index = nodeNames.indexOf("transformations")) == -1)
            return "tag <transformations> missing";
        else {
            if (index != TRANSFORMATIONS_INDEX)
                this.onXMLMinorError("tag <transformations> out of order");

            //Parse transformations block
            if ((error = this.parseTransformations(nodes[index])) != null)
                return error;
        }

        // <animations>
        if ((index = nodeNames.indexOf("animations")) == -1)
            return "tag <animations> missing";
        else {
            if (index != ANIMATIONS_INDEX)
                this.onXMLMinorError("tag <animations> out of order");

            //Parse primitives block
            if ((error = this.parseAnimations(nodes[index])) != null)
                return error;
        }

        // <primitives>
        if ((index = nodeNames.indexOf("primitives")) == -1)
            return "tag <primitives> missing";
        else {
            if (index != PRIMITIVES_INDEX)
                this.onXMLMinorError("tag <primitives> out of order");

            //Parse primitives block
            if ((error = this.parsePrimitives(nodes[index])) != null)
                return error;
        }

        // <components>
        if ((index = nodeNames.indexOf("components")) == -1)
            return "tag <components> missing";
        else {
            if (index != COMPONENTS_INDEX)
                this.onXMLMinorError("tag <components> out of order");

            //Parse components block
            if ((error = this.parseComponents(nodes[index])) != null)
                return error;
        }
        this.log("all parsed");
    }

    /**
     * Parses the <scene> block. 
     * @param {scene block element} sceneNode
     */
    parseScene(sceneNode) {

        // Get root of the scene.
        var root = this.reader.getString(sceneNode, 'root')
        if (root == null)
            return "no root defined for scene";

        this.idRoot = root;
        //this.idRoot = demoRoot;

        // Get axis length        
        var axis_length = this.reader.getFloat(sceneNode, 'axis_length');
        if (axis_length == null)
            this.onXMLMinorError("no axis_length defined for scene; assuming 'length = 1'");

        this.referenceLength = axis_length || 1;

        this.log("Parsed scene");

        return null;
    }

    /**
     * Parses the <views> block.
     * @param {view block element} viewsNode
     */
    parseView(viewsNode) {
        var children = viewsNode.children;

        var nCameras = 0;
        this.views = [];
        var nodeNames = [];
        var grandChildren = [];

        this.defaultId = this.reader.getString(viewsNode, 'default');
        if (this.defaultId == null)
            return "no default view defined";

        // Any number of views.
        for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "perspective" && children[i].nodeName != "ortho") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current view.
            var viewId = this.reader.getString(children[i], 'id');
            if (viewId == null)
                return "no ID defined for view";

            // Checks for repeated IDs.
            if (this.views[viewId] != null)
                return "ID must be unique for each view (conflict: ID = " + viewId + ")";

            // Gets the near value from view 
            var near = this.reader.getFloat(children[i], 'near');
            if (!(near != null && !isNaN(near)))
                return "unable to parse near of view = " + viewId;

            // Gets far value from view
            var far = this.reader.getFloat(children[i], 'far');
            if (!(far != null && !isNaN(far)))
                return "unable to parse far of view = " + viewId;
    
            grandChildren = children[i].children;

            nodeNames = [];
            for (var j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }

            var fromIndex = nodeNames.indexOf('from');
            var toIndex = nodeNames.indexOf('to');
           
            var from = this.parseCoordinates3D(grandChildren[fromIndex], viewId);
            if (!Array.isArray(from))
                return from;
            var to = this.parseCoordinates3D(grandChildren[toIndex], viewId);
            if (!Array.isArray(to))
                return to;
            
            // Gets the perspective view attributes
            if(children[i].nodeName == 'perspective'){
                
                var angle = this.reader.getFloat(children[i], 'angle');
                if (!(angle != null && !isNaN(angle)))
                    return "unable to parse angle of view = " + viewId;

                var perspective = new CGFcamera(angle * DEGREE_TO_RAD, near, far, vec3.fromValues(...from), vec3.fromValues(...to));
                this.views[viewId] = perspective;
            }
            // Gets the ortho view attributes
            else if(children[i].nodeName == 'ortho'){

                var left = this.reader.getFloat(children[i], 'left');
                if (!(left != null && !isNaN(left)))
                    return "unable to parse left of view = " + viewId;

                var right = this.reader.getFloat(children[i], 'right');
                if (!(right != null && !isNaN(right)))
                    return "unable to parse right of view = " + viewId;

                var top = this.reader.getFloat(children[i], 'top');
                if (!(top != null && !isNaN(top)))
                    return "unable to parse top of view = " + viewId;

                var bottom = this.reader.getFloat(children[i], 'bottom');
                if (!(bottom != null && !isNaN(bottom)))
                    return "unable to parse bottom of view = " + viewId;

                var upIndex = nodeNames.indexOf('up');
                var up;
                if(upIndex == -1){
                    up = [0, 1, 0];
                }
                else{
                    up = this.parseCoordinates3D(grandChildren[upIndex], viewId);
                    if (!Array.isArray(up))
                    return up;
                }

                var ortho = new CGFcameraOrtho(left, right, bottom, top, near, far, vec3.fromValues(...from), vec3.fromValues(...to), vec3.fromValues(...up));
                this.views[viewId] = ortho;
            }
            // Increments number of views
            nCameras++;
        }

        if(nCameras == 0){
            return "no cameras defined";
        }

        return null;
    }

    /**
     * Parses the <globals> node.
     * @param {globals block element} globalsNode
     */
    parseGlobals(globalsNode) {

        var children = globalsNode.children;

        this.ambient = [];
        this.background = [];

        var nodeNames = [];

        for (var i = 0; i < children.length; i++)
            nodeNames.push(children[i].nodeName);

        var ambientIndex = nodeNames.indexOf("ambient");
        var backgroundIndex = nodeNames.indexOf("background");

        var color = this.parseColor(children[ambientIndex], "ambient");
        if (!Array.isArray(color))
            return color;
        else
            this.ambient = color;

        color = this.parseColor(children[backgroundIndex], "background");
        if (!Array.isArray(color))
            return color;
        else
            this.background = color;

        this.log("Parsed globals");

        return null;
    }

    /**
     * Parses the <light> node.
     * @param {lights block element} lightsNode
     */
    parseLights(lightsNode) {
        var children = lightsNode.children;

        this.lights = [];
        var numLights = 0;

        var grandChildren = [];
        var nodeNames = [];

        // Any number of lights.
        for (var i = 0; i < children.length; i++) {

            // Storing light information
            var global = [];
            var attributeNames = [];
            var attributeTypes = [];

            //Check type of light
            if (children[i].nodeName != "omni" && children[i].nodeName != "spot") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }
            else {
                attributeNames.push(...["location", "ambient", "diffuse", "specular"]);
                attributeTypes.push(...["position", "color", "color", "color"]);
            }

            // Get id of the current light.
            var lightId = this.reader.getString(children[i], 'id');
            if (lightId == null)
                return "no ID defined for light";

            // Checks for repeated IDs.
            if (this.lights[lightId] != null)
                return "ID must be unique for each light (conflict: ID = " + lightId + ")";

            // Light enable/disable
            var enableLight = true;
            var aux = this.reader.getBoolean(children[i], 'enabled');
            if (!(aux != null && !isNaN(aux) && (aux == true || aux == false)))
                this.onXMLMinorError("unable to parse value component of the 'enable light' field for ID = " + lightId + "; assuming 'value = 1'");

            enableLight = aux || 1;

            //Add enabled boolean and type name to light info
            global.push(enableLight);
            global.push(children[i].nodeName);

            grandChildren = children[i].children;
            // Specifications for the current light.

            nodeNames = [];
            for (var j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }

            for (var j = 0; j < attributeNames.length; j++) {
                var attributeIndex = nodeNames.indexOf(attributeNames[j]);

                if (attributeIndex != -1) {
                    if (attributeTypes[j] == "position")
                        var aux = this.parseCoordinates4D(grandChildren[attributeIndex], "light position for ID" + lightId);
                    else
                        var aux = this.parseColor(grandChildren[attributeIndex], attributeNames[j] + " illumination for ID" + lightId);

                    if (!Array.isArray(aux))
                        return aux;

                    global.push(aux);
                }
                else
                    return "light " + attributeNames[i] + " undefined for ID = " + lightId;
            }

            // Gets the additional attributes of the spot light
            if (children[i].nodeName == "spot") {
                var angle = this.reader.getFloat(children[i], 'angle');
                if (!(angle != null && !isNaN(angle)))
                    return "unable to parse angle of the light for ID = " + lightId;

                var exponent = this.reader.getFloat(children[i], 'exponent');
                if (!(exponent != null && !isNaN(exponent)))
                    return "unable to parse exponent of the light for ID = " + lightId;

                var targetIndex = nodeNames.indexOf("target");

                // Retrieves the light target.
                var targetLight = [];
                if (targetIndex != -1) {
                    var aux = this.parseCoordinates3D(grandChildren[targetIndex], "target light for ID " + lightId);
                    if (!Array.isArray(aux))
                        return aux;

                    targetLight = aux;
                }
                else
                    return "light target undefined for ID = " + lightId;

                global.push(...[angle, exponent, targetLight])
            }

            this.lights[lightId] = global;
            numLights++;
        }

        if (numLights == 0)
            return "at least one light must be defined";
        else if (numLights > 8)
            this.onXMLMinorError("too many lights defined; WebGL imposes a limit of 8 lights");

        this.log("Parsed lights");
        return null;
    }

    /**
     * Parses the <textures> block. 
     * @param {textures block element} texturesNode
     */
    parseTextures(texturesNode) {

        var children = texturesNode.children;
        this.textures = [];

        for(var i = 0; i < children.length; i++){

            if (children[i].nodeName != "texture") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current texture
            var textureID = this.reader.getString(children[i], 'id');
            if (textureID == null)
                return "no ID defined for texture";

            // Checks for repeated IDs.
            if (this.textures[textureID] != null)
                return "ID must be unique for each texture (conflict: ID = " + textureID + ")";            

            //Gets the file name
            var file = this.reader.getString(children[i], 'file');
            if(file == null){
                return "no file found";
            }

            //Checks the file extension
            var image = file.match(/\.png|jpg$/i);
            if(image == null) {
                return "Invalid extension for the texture with texture ID " + textureID;
            }

            var texture = new CGFtexture(this.scene, file);
            this.textures[textureID] = texture; 
        }

        this.log("Parsed textures");
        return null;
    }

    /**
     * Parses the <materials> node.
     * @param {materials block element} materialsNode
     */
    parseMaterials(materialsNode) {
        var children = materialsNode.children;

        this.materials = [];
        var grandChildren = [];
        var nodeNames = [];

        // Any number of materials.
        for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "material") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current material.
            var materialID = this.reader.getString(children[i], 'id');
            if (materialID == null)
                return "no ID defined for material";

            // Checks for repeated IDs.
            if (this.materials[materialID] != null)
                return "ID must be unique for each material (conflict: ID = " + materialID + ")";

            var grandChildren = children[i].children;
            var skipMaterial = false;

            for(var j = 0; j < grandChildren.length; j++){
                if(grandChildren[j].nodeName != 'emission' && grandChildren[j].nodeName != 'ambient' && 
                                                                grandChildren[j].nodeName != 'diffuse' &&
                                                                    grandChildren[j].nodeName != 'specular'){
                    skipMaterial = true;
                    this.onXMLMinorError("unknown tag");
                    break;
                }
                nodeNames.push(grandChildren[j].nodeName);
            }

            // If some attribute is missing, skips the material
            if(skipMaterial){
                continue;
            }

            var shininess = this.reader.getFloat(children[i], 'shininess');

            // Gets the index of each tag
            var emissionIndex = nodeNames.indexOf('emission');
            var ambientIndex = nodeNames.indexOf('ambient');
            var diffuseIndex = nodeNames.indexOf('diffuse');
            var specularIndex = nodeNames.indexOf('specular');

            
            if (emissionIndex == -1 || ambientIndex == -1 || diffuseIndex == -1 || specularIndex == -1) {
                this.onXMLMinorError("components emission, ambient, diffuse and specular must be defined on each material");
                continue;
            }

            var emission = this.parseColor(grandChildren[emissionIndex], "something wrong with the emission tag");
            var ambient = this.parseColor(grandChildren[ambientIndex], "something wrong with the ambient tag");
            var diffuse = this.parseColor(grandChildren[diffuseIndex],"something wrong with the diffuse tag");
            var specular = this.parseColor(grandChildren[specularIndex], "something wrong with the specular tag");

            var material = new CGFappearance(this.scene);
            material.setShininess(shininess);
            material.setEmission(...emission);
            material.setAmbient(...ambient);
            material.setDiffuse(...diffuse);
            material.setSpecular(...specular);

            this.materials[materialID] = material;
        }

        this.log("Parsed materials");
        return null;
    }

    /**
     * Parses the <transformations> block.
     * @param {transformations block element} transformationsNode
     */
    parseTransformations(transformationsNode) {
        var children = transformationsNode.children;

        this.transformations = [];
        var grandChildren = [];

        // Any number of transformations.
        for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "transformation") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current transformation.
            var transformationID = this.reader.getString(children[i], 'id');
            if (transformationID == null)
                return "no ID defined for transformation";

            // Checks for repeated IDs.
            if (this.transformations[transformationID] != null)
                return "ID must be unique for each transformation (conflict: ID = " + transformationID + ")";

            grandChildren = children[i].children;

            // Specifications for the current transformation.
            var transfMatrix = mat4.create();

            for (var j = 0; j < grandChildren.length; j++) {
                switch (grandChildren[j].nodeName) {
                    case 'translate':
                        var coordinates = this.parseCoordinates3D(grandChildren[j], "translate transformation for ID " + transformationID);
                        if (!Array.isArray(coordinates))
                            return coordinates;

                        transfMatrix = mat4.translate(transfMatrix, transfMatrix, coordinates);
                        break;
                    case 'scale':
                        var coordinates = this.parseCoordinates3D(grandChildren[j], "scale transformation for ID " + transformationID);
                        if (!Array.isArray(coordinates))
                            return coordinates;
    
                        transfMatrix = mat4.scale(transfMatrix, transfMatrix, coordinates);                        
                        break;
                    case 'rotate':
                        var axis = this.reader.getString(grandChildren[j], 'axis');
                        var angle = this.reader.getFloat(grandChildren[j], 'angle');
                        if (axis == 'x') {
                            transfMatrix = mat4.rotateX(transfMatrix, transfMatrix, angle * (Math.PI / 180));
                        }
                        else if (axis == 'y') {
                            transfMatrix = mat4.rotateY(transfMatrix, transfMatrix, angle * (Math.PI / 180));
                        }
                        else if (axis == 'z') {
                            transfMatrix = mat4.rotateZ(transfMatrix, transfMatrix, angle * (Math.PI / 180));
                        }
                        break;
                }
            }
            this.transformations[transformationID] = transfMatrix;
        }

        this.log("Parsed transformations");
        return null;
    }

    /*
     * @param {animations block element} animationsNode 
     */
    parseAnimations(animationsNode){

        var children = animationsNode.children;
        this.animations = [];

        // any number of animations
        for(var i = 0; i < children.length; i++){

            this.kf = [];
            if (children[i].nodeName != "animation") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current animation
            var animationID = this.reader.getString(children[i], 'id');
            if (animationID == null)
                return "no ID defined for animation";

            // Checks for repeated IDs.
            if (this.animations[animationID] != null)
                return "ID must be unique for each primitive (conflict: ID = " + animationID + ")";

            var grandChildren = children[i].children;

            // any number of keyframes
            for(var j = 0; j < grandChildren.length; j++){

                if (grandChildren[j].nodeName != "keyframe") {
                    this.onXMLMinorError("unknown tag <" + grandChildren[j].nodeName + ">");
                    continue;
                }

                // Get instant of the current keyframe
                var keyframeInstant = this.reader.getFloat(grandChildren[j], 'instant');
                if (keyframeInstant == null)
                    return "no instant defined for keyframe";

                // has the transformations on the keyframe
                var grandgrandChildren = grandChildren[j].children;

                if(grandgrandChildren.length != 3 || (
                    grandgrandChildren[0].nodeName != 'translate' &&
                        grandgrandChildren[1].nodeName != 'rotate' &&
                            grandgrandChildren[2].nodeName != 'scale')){
                    return "There must be exactly 3 transformations in each keyframe (translate, rotate and scale)";
                }

                var trans = [];
                if(grandgrandChildren[0].nodeName == 'translate'){
                    //x
                    var x = this.reader.getFloat(grandgrandChildren[0], 'x');
                    if (!(x != null && !isNaN(x)))
                        return "unable to parse x of the translation of keyframe in instant = " + keyframeInstant;
                    //y
                    var y = this.reader.getFloat(grandgrandChildren[0], 'y');
                    if (!(y != null && !isNaN(y)))
                        return "unable to parse y of the translation of keyframe in instant = " + keyframeInstant;
                    //z
                    var z = this.reader.getFloat(grandgrandChildren[0], 'z');
                    if (!(z != null && !isNaN(z)))
                        return "unable to parse z of the translation of keyframe in instant = " + keyframeInstant;
                    
                    trans.push(x);
                    trans.push(y);
                    trans.push(z);
                }

                var rot = [];
                if(grandgrandChildren[1].nodeName == 'rotate'){
                    //angle_x
                    var angle_x = this.reader.getFloat(grandgrandChildren[1], 'angle_x');
                    if (!(angle_x != null && !isNaN(angle_x)))
                        return "unable to parse angle_x of the rotation of keyframe in instant = " + keyframeInstant;
                    //angle_y
                    var angle_y = this.reader.getFloat(grandgrandChildren[1], 'angle_y');
                    if (!(angle_y != null && !isNaN(angle_y)))
                        return "unable to parse angle_y of the rotation of keyframe in instant = " + keyframeInstant;
                    //angle_z
                    var angle_z = this.reader.getFloat(grandgrandChildren[1], 'angle_z');
                    if (!(angle_z != null && !isNaN(angle_z)))
                        return "unable to parse angle_z of the rotation of keyframe in instant = " + keyframeInstant;

                    rot.push(angle_x);
                    rot.push(angle_y);
                    rot.push(angle_z);
                }

                var sca = [];
                if(grandgrandChildren[2].nodeName == 'scale'){
                    //x
                    var x = this.reader.getFloat(grandgrandChildren[2], 'x');
                    if (!(x != null && !isNaN(x)))
                        return "unable to parse x of the scaling of keyframe in instant = " + keyframeInstant;
                    //y
                    var y = this.reader.getFloat(grandgrandChildren[2], 'y');
                    if (!(y != null && !isNaN(y)))
                        return "unable to parse y of the scaling of keyframe in instant = " + keyframeInstant;
                    //z
                    var z = this.reader.getFloat(grandgrandChildren[2], 'z');
                    if (!(z != null && !isNaN(z)))
                        return "unable to parse z of the scaling of keyframe in instant = " + keyframeInstant;
                
                    sca.push(x);
                    sca.push(y);
                    sca.push(z);
                }
                var kfa = new MyKeyFrame(this.scene, keyframeInstant, trans, rot, sca);
                this.kf.push(kfa);
            }
            var anim = new MyKeyFrameAnimation(this.scene, animationID);
            anim.keyFrames = this.kf;

            this.animations[animationID] = anim;
        }
    }

    /**
     * Parses the <primitives> block.
     * @param {primitives block element} primitivesNode
     */
    parsePrimitives(primitivesNode) {
        var children = primitivesNode.children;

        this.primitives = [];
        var grandChildren = [];

        // Any number of primitives.
        for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "primitive") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current primitive.
            var primitiveId = this.reader.getString(children[i], 'id');
            if (primitiveId == null)
                return "no ID defined for texture";

            // Checks for repeated IDs.
            if (this.primitives[primitiveId] != null)
                return "ID must be unique for each primitive (conflict: ID = " + primitiveId + ")";

            grandChildren = children[i].children;

            // Validate the primitive type
            if (grandChildren.length != 1 ||
                (grandChildren[0].nodeName != 'rectangle' && grandChildren[0].nodeName != 'triangle' &&
                    grandChildren[0].nodeName != 'cylinder' && grandChildren[0].nodeName != 'sphere' &&
                    grandChildren[0].nodeName != 'torus' && grandChildren[0].nodeName != 'plane' &&
                    grandChildren[0].nodeName != 'patch' && grandChildren[0].nodeName != 'cylinder2')) {
                return "There must be exactly 1 primitive type (rectangle, triangle, cylinder, sphere or torus)"
            }

            // Specifications for the current primitive.
            var primitiveType = grandChildren[0].nodeName;

            // Retrieves the primitive coordinates.
            // Rectangle
            if (primitiveType == 'rectangle') {
                // x1
                var x1 = this.reader.getFloat(grandChildren[0], 'x1');
                if (!(x1 != null && !isNaN(x1)))
                    return "unable to parse x1 of the primitive coordinates for ID = " + primitiveId;

                // y1
                var y1 = this.reader.getFloat(grandChildren[0], 'y1');
                if (!(y1 != null && !isNaN(y1)))
                    return "unable to parse y1 of the primitive coordinates for ID = " + primitiveId;

                // x2
                var x2 = this.reader.getFloat(grandChildren[0], 'x2');
                if (!(x2 != null && !isNaN(x2) && x2 > x1))
                    return "unable to parse x2 of the primitive coordinates for ID = " + primitiveId;

                // y2
                var y2 = this.reader.getFloat(grandChildren[0], 'y2');
                if (!(y2 != null && !isNaN(y2) && y2 > y1))
                    return "unable to parse y2 of the primitive coordinates for ID = " + primitiveId;

                var rect = new MyRectangle(this.scene, primitiveId, x1, x2, y1, y2);
                this.primitives[primitiveId] = rect;
            }
            // Triangle
            else if(primitiveType == 'triangle'){
                // x1
                var x1 = this.reader.getFloat(grandChildren[0], 'x1');
                if (!(x1 != null && !isNaN(x1)))
                    return "unable to parse x1 of the primitive coordinates for ID = " + primitiveId;
                // x2
                var x2 = this.reader.getFloat(grandChildren[0], 'x2');
                if (!(x2 != null && !isNaN(x2)))
                    return "unable to parse x2 of the primitive coordinates for ID = " + primitiveId;
                // x3
                var x3 = this.reader.getFloat(grandChildren[0], 'x3');
                if (!(x3 != null && !isNaN(x3)))
                    return "unable to parse x3 of the primitive coordinates for ID = " + primitiveId;

                // y1
                var y1 = this.reader.getFloat(grandChildren[0], 'y1');
                if (!(y1 != null && !isNaN(y1)))
                    return "unable to parse y1 of the primitive coordinates for ID = " + primitiveId;
                // y2
                var y2 = this.reader.getFloat(grandChildren[0], 'y2');
                if (!(y2 != null && !isNaN(y2)))
                    return "unable to parse y2 of the primitive coordinates for ID = " + primitiveId;
                // y3
                var y3 = this.reader.getFloat(grandChildren[0], 'y3');
                if (!(y3 != null && !isNaN(y3)))
                    return "unable to parse y2 of the primitive coordinates for ID = " + primitiveId;

                // z1
                var z1 = this.reader.getFloat(grandChildren[0], 'z1');
                if (!(z1 != null && !isNaN(z1)))
                    return "unable to parse z1 of the primitive coordinates for ID = " + primitiveId;
                // z2
                var z2 = this.reader.getFloat(grandChildren[0], 'z2');
                if (!(z2 != null && !isNaN(z2)))
                    return "unable to parse z2 of the primitive coordinates for ID = " + primitiveId;
                // z3
                var z3 = this.reader.getFloat(grandChildren[0], 'z3');
                if (!(z3 != null && !isNaN(z3)))
                    return "unable to parse z3 of the primitive coordinates for ID = " + primitiveId;

                var tri = new MyTriangle(this.scene, primitiveId, x1, x2, x3, y1, y2, y3, z1, z2, z3);
                this.primitives[primitiveId] = tri;
            }
            //Cylinder
            else if(primitiveType == 'cylinder'){
                // baseRadius
                var baseRadius = this.reader.getFloat(grandChildren[0], 'baseRadius');
                if (!(baseRadius != null && !isNaN(x1)))
                    return "unable to parse baseRadius of the primitive coordinates for ID = " + primitiveId;
                // topRadius
                var topRadius = this.reader.getFloat(grandChildren[0], 'topRadius');
                if (!(topRadius != null && !isNaN(x1)))
                    return "unable to parse topRadius of the primitive coordinates for ID = " + primitiveId;
                //height
                var height = this.reader.getFloat(grandChildren[0], 'height');
                if (!(height != null && !isNaN(x1)))
                    return "unable to parse height of the primitive coordinates for ID = " + primitiveId;
                // slices
                var slices = this.reader.getFloat(grandChildren[0], 'slices');
                if (!(slices != null && !isNaN(x1)))
                    return "unable to parse slices of the primitive coordinates for ID = " + primitiveId;
                //stacks
                var stacks = this.reader.getFloat(grandChildren[0], 'stacks');
                if (!(stacks != null && !isNaN(x1)))
                    return "unable to parse stacks of the primitive coordinates for ID = " + primitiveId;

                var cy = new MyCylinder(this.scene, primitiveId, baseRadius, topRadius, height, slices, stacks);
                this.primitives[primitiveId] = cy;
            }
            //Sphere
            else if(primitiveType == 'sphere'){
                // radius
                var radius = this.reader.getFloat(grandChildren[0], 'radius');
                if (!(radius != null && !isNaN(x1)))
                    return "unable to parse baseRadius of the primitive coordinates for ID = " + primitiveId;
                // slices
                var slices = this.reader.getFloat(grandChildren[0], 'slices');
                if (!(slices != null && !isNaN(x1)))
                    return "unable to parse slices of the primitive coordinates for ID = " + primitiveId;
                //stacks
                var stacks = this.reader.getFloat(grandChildren[0], 'stacks');
                if (!(stacks != null && !isNaN(x1)))
                    return "unable to parse stacks of the primitive coordinates for ID = " + primitiveId;

                var sph = new MySphere(this.scene, primitiveId, radius, slices, stacks);
                this.primitives[primitiveId] = sph;
            }
            //Torus
            else if(primitiveType == 'torus'){
                // inner
                var inner = this.reader.getFloat(grandChildren[0], 'inner');
                if (!(inner != null && !isNaN(x1)))
                    return "unable to parse baseRadius of the primitive coordinates for ID = " + primitiveId;
                // outer
                var outer = this.reader.getFloat(grandChildren[0], 'outer');
                if (!(outer != null && !isNaN(x1)))
                    return "unable to parse topRadius of the primitive coordinates for ID = " + primitiveId;
                // slices
                var slices = this.reader.getFloat(grandChildren[0], 'slices');
                if (!(slices != null && !isNaN(x1)))
                    return "unable to parse slices of the primitive coordinates for ID = " + primitiveId;
                //loops
                var loops = this.reader.getFloat(grandChildren[0], 'loops');
                if (!(loops != null && !isNaN(x1)))
                    return "unable to parse stacks of the primitive coordinates for ID = " + primitiveId;

                var tor = new MyTorus(this.scene, primitiveId, inner, outer, slices, loops);
                this.primitives[primitiveId] = tor;
            }
            //Plane
            else if(primitiveType == 'plane'){
                //npartsU
                var npartsU = this.reader.getFloat(grandChildren[0], 'npartsU');
                if (!(npartsU != null && !isNaN(npartsU)))
                    return "unable to parse npartsU of the primitive coordinates for ID = " + primitiveId;
                // npartsV
                var npartsV = this.reader.getFloat(grandChildren[0], 'npartsV');
                if (!(npartsV != null && !isNaN(npartsV)))
                    return "unable to parse npartsV of the primitive coordinates for ID = " + primitiveId;

                var plane = new MyPlane(this.scene, npartsU, npartsV);
                this.primitives[primitiveId] = plane;
            }
            //Patch
            else if(primitiveType == 'patch'){
                var cPoints = [];
                var grandgrandChildren = grandChildren[0].children;

                //npointsU
                var npointsU = this.reader.getFloat(grandChildren[0], 'npointsU');
                if (!(npointsU != null && !isNaN(npointsU)))
                    return "unable to parse npointsU of the primitive coordinates for ID = " + primitiveId;
                // npointsV
                var npointsV = this.reader.getFloat(grandChildren[0], 'npointsV');
                if (!(npointsV != null && !isNaN(npointsV)))
                    return "unable to parse npointsV of the primitive coordinates for ID = " + primitiveId;
                //npartsU
                var npartsU = this.reader.getFloat(grandChildren[0], 'npartsU');
                if (!(npartsU != null && !isNaN(npartsU)))
                    return "unable to parse npartsU of the primitive coordinates for ID = " + primitiveId;
                // npartsV
                var npartsV = this.reader.getFloat(grandChildren[0], 'npartsV');
                if (!(npartsV != null && !isNaN(npartsV)))
                    return "unable to parse npartsV of the primitive coordinates for ID = " + primitiveId;
                // cPoints
                for(var j = 0; j < grandgrandChildren.length; j++) {
                    var cPoint = [];
                    //xx
                    var xx = this.reader.getFloat(grandgrandChildren[j], 'xx');
                    if (!(xx != null && !isNaN(xx)))
                        return "unable to parse xx of the primitive coordinates for ID = " + primitiveId;
                    //yy
                    var yy = this.reader.getFloat(grandgrandChildren[j], 'yy');
                    if (!(yy != null && !isNaN(yy)))
                        return "unable to parse yy of the primitive coordinates for ID = " + primitiveId;
                    //zz
                    var zz = this.reader.getFloat(grandgrandChildren[j], 'zz');
                    if (!(zz != null && !isNaN(zz)))
                        return "unable to parse zz of the primitive coordinates for ID = " + primitiveId;

                    cPoint.push(xx);
                    cPoint.push(yy);
                    cPoint.push(zz);

                    cPoints.push(cPoint);
                }

                var patch = new MyPatch(this.scene, npointsU, npointsV, npartsU, npartsV, cPoints);
                this.primitives[primitiveId] = patch;
            }
            //cylinder2
            else if(primitiveType == 'cylinder2'){
                //base
                var base = this.reader.getFloat(grandChildren[0], 'base');
                if (!(base != null && !isNaN(base)))
                    return "unable to parse base of the primitive coordinates for ID = " + primitiveId;
                // top
                var top = this.reader.getFloat(grandChildren[0], 'top');
                if (!(top != null && !isNaN(top)))
                    return "unable to parse top of the primitive coordinates for ID = " + primitiveId;
                //heigth
                var height = this.reader.getFloat(grandChildren[0], 'height');
                if (!(height != null && !isNaN(height)))
                    return "unable to parse height of the primitive coordinates for ID = " + primitiveId;
                // slices
                var slices = this.reader.getFloat(grandChildren[0], 'slices');
                if (!(slices != null && !isNaN(slices)))
                    return "unable to parse slices of the primitive coordinates for ID = " + primitiveId;
                // stacks
                var stacks = this.reader.getFloat(grandChildren[0], 'stacks');
                if (!(stacks != null && !isNaN(stacks)))
                    return "unable to parse stacks of the primitive coordinates for ID = " + primitiveId;

                var cylinder2 = new MyCylinder2(this.scene, base, top, height, slices, stacks);
                this.primitives[primitiveId] = cylinder2;
            }
            else {
                console.warn("To do: Parse other primitives.");
            }
        }

        this.log("Parsed primitives");
        return null;
    }

    /**
   * Parses the <components> block.
   * @param {components block element} componentsNode
   */
    parseComponents(componentsNode) {
        var children = componentsNode.children;

        this.components = [];
        var grandChildren = [];
        var grandgrandChildren = [];
        var nodeNames = [];

        // Any number of components.
        for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "component") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current component.
            var componentID = this.reader.getString(children[i], 'id');
            if (componentID == null)
                return "no ID defined for componentID";

            // Checks for repeated IDs.
            if (this.components[componentID] != null)
                return "ID must be unique for each component (conflict: ID = " + componentID + ")";

            grandChildren = children[i].children;

            nodeNames = [];
            for (var j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }

            var transformationIndex = nodeNames.indexOf("transformation");
            var animationsIndex = nodeNames.indexOf("animationref");
            var materialsIndex = nodeNames.indexOf("materials");
            var textureIndex = nodeNames.indexOf("texture");
            var childrenIndex = nodeNames.indexOf("children");

            // Transformations

            var transfMatrix;
            grandgrandChildren = grandChildren[transformationIndex].children;

            // if there are no transformations
            if (grandgrandChildren.length == 0)
                transfMatrix = mat4.create();
            else if (grandgrandChildren[0].nodeName == "transformationref") {
                var transfID = this.reader.getString(grandgrandChildren[0], 'id');
                // cant find the id
                if (transfID == null)
                    return "unable to parse transformation id of component ID " + componentID;
                transfMatrix = this.transformations[transfID];
                // cant find transformations inside the ref
                if (transfMatrix == null) {
                    return "no such transformation with ID " + transfID + " for component ID " + componentID;
                }
                // if there are multiple transformation refs
                if (grandgrandChildren.length > 1)
                    this.onXMLMinorError("Multiple transformations declared and/or referred on " + componentID + "; defaulting to first referred transformation.");
            }
            else {
                var transformArray = mat4.create();

                for (var j = 0; j < grandgrandChildren.length; j++) {
                    if (grandgrandChildren[j].nodeName == "translate") {
                        var t_x = this.reader.getFloat(grandgrandChildren[j], 'x');
                        var t_y = this.reader.getFloat(grandgrandChildren[j], 'y');
                        var t_z = this.reader.getFloat(grandgrandChildren[j], 'z');
                        transfMatrix = mat4.translate(transformArray, transformArray, [t_x, t_y, t_z]);
                    }
                    else if (grandgrandChildren[j].nodeName == "scale") {
                        var s_x = this.reader.getFloat(grandgrandChildren[j], 'x');
                        var s_y = this.reader.getFloat(grandgrandChildren[j], 'y');
                        var s_z = this.reader.getFloat(grandgrandChildren[j], 'z');
                        transfMatrix = mat4.scale(transformArray, transformArray, [s_x, s_y, s_z]);
                    }
                    else if (grandgrandChildren[j].nodeName == "rotate") {
                        var axis = this.reader.getString(grandgrandChildren[j], 'axis');
                        var angle = this.reader.getFloat(grandgrandChildren[j], 'angle');
                        if (axis == "x")
                            transfMatrix = mat4.rotateX(transformArray, transformArray, angle * (Math.PI / 180));
                        else if (axis == "y")
                            transfMatrix = mat4.rotateY(transformArray, transformArray, angle * (Math.PI / 180));
                        else if (axis == "z")
                            transfMatrix = mat4.rotateZ(transformArray, transformArray, angle * (Math.PI / 180));
                    }  
                }
            }

            //Animations
            var animationID = this.reader.getString(grandChildren[animationsIndex], 'id');

        
            // Materials
            var materials = [];
            grandgrandChildren = grandChildren[materialsIndex].children;

            for (var j = 0; j < grandgrandChildren.length; j++) {
                var materialID = this.reader.getString(grandgrandChildren[j], 'id');

                //Checks if the material exists
                if (materialID == null) {
                    return "Cant parse material of component " + componentID;
                }
                //Checks if the material is created
                if (materialID != "inherit" && this.materials[materialID] == null) {
                    return "No material with ID " + materialID;
                }
                //First root cannot inherit materials
                if (componentID == this.idRoot && materialID == "inherit") {
                    return "Initial Root cannot inherit materials";
                }

                materials.push(materialID);
            }

            // Texture
            var texID = this.reader.getString(grandChildren[textureIndex], 'id');

            if(texID == null) {
                return "Cant parse texture of component " + componentID;
            }
            
            if(this.textures[texID] == null && texID != "none" && texID != "inherit") {
                return "No texture with ID " + texID;
            }

            //idRoot cannot inherit textures
            if(componentID == this.idRoot && texID == "inherit") {
                return "Initial Root cannot inherit textures";
            }

            // Gets length_s and legth_t values from texture declaration
            var l_s = this.reader.getFloat(grandChildren[textureIndex], 'length_s', false);
            var l_t = this.reader.getFloat(grandChildren[textureIndex], 'length_t', false);

            if ((texID == "none" || texID == "inherit") && (l_s != null || l_t != null)) {
                return "The texture " + texID + "cannot have length_s and length_t values."; 
            }

            // Values them as 1 if they are null or 0 
            if(l_s == null || l_s == 0){
                l_s = 1;
            }
            if(l_t == null || l_t == 0){
                l_t = 1;
            }

            // Children
            var comp = [];
            var prim = [];

            grandgrandChildren = grandChildren[childrenIndex].children;

            for (var j = 0; j < grandgrandChildren.length; j++) {
                // Checks if its a component inside a component
                if (grandgrandChildren[j].nodeName == "componentref") {
                    var cRef = this.reader.getString(grandgrandChildren[j], 'id');
                   if(cRef == null) {
                       return "Valor de cref nulo";
                   }
                   comp.push(cRef);
                }
                // Checks if they have primitives inside them
                else if (grandgrandChildren[j].nodeName == "primitiveref") {
                    var pRef = this.reader.getString(grandgrandChildren[j], 'id');
                    if(pRef == null) {
                        return "Valor de pref nulo";
                    }
                    prim.push(pRef);
                }
                else
                    this.onXMLMinorError("component children must be componentref or primitiveref");
            }
            // Creates new component with all attributes parsed
            this.components[componentID] = new MyComponent(this.scene, componentID, materials, texID, l_s, l_t, prim, comp);
            this.components[componentID].transformations = transfMatrix;
            if(animationID != "none"){
                this.components[componentID].animation = animationID;
            }
            else{
                this.components[componentID].animation = null;
            }
            
        }

        this.log("Parsed components");
        return null;
    }


    /**
     * Parse the coordinates from a node with ID = id
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseCoordinates3D(node, messageError) {
        var position = [];

        // x
        var x = this.reader.getFloat(node, 'x');
        if (!(x != null && !isNaN(x)))
            return "unable to parse x-coordinate of the " + messageError;

        // y
        var y = this.reader.getFloat(node, 'y');
        if (!(y != null && !isNaN(y)))
            return "unable to parse y-coordinate of the " + messageError;

        // z
        var z = this.reader.getFloat(node, 'z');
        if (!(z != null && !isNaN(z)))
            return "unable to parse z-coordinate of the " + messageError;

        position.push(...[x, y, z]);

        return position;
    }

    /**
     * Parse the coordinates from a node with ID = id
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseCoordinates4D(node, messageError) {
        var position = [];

        //Get x, y, z
        position = this.parseCoordinates3D(node, messageError);

        if (!Array.isArray(position))
            return position;


        // w
        var w = this.reader.getFloat(node, 'w');
        if (!(w != null && !isNaN(w)))
            return "unable to parse w-coordinate of the " + messageError;

        position.push(w);

        return position;
    }

    /**
     * Parse the color components from a node
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseColor(node, messageError) {
        var color = [];

        // R
        var r = this.reader.getFloat(node, 'r');
        if (!(r != null && !isNaN(r) && r >= 0 && r <= 1))
            return "unable to parse R component of the " + messageError;

        // G
        var g = this.reader.getFloat(node, 'g');
        if (!(g != null && !isNaN(g) && g >= 0 && g <= 1))
            return "unable to parse G component of the " + messageError;

        // B
        var b = this.reader.getFloat(node, 'b');
        if (!(b != null && !isNaN(b) && b >= 0 && b <= 1))
            return "unable to parse B component of the " + messageError;

        // A
        var a = this.reader.getFloat(node, 'a');
        if (!(a != null && !isNaN(a) && a >= 0 && a <= 1))
            return "unable to parse A component of the " + messageError;

        color.push(...[r, g, b, a]);

        return color;
    }

    /*
     * Callback to be executed on any read error, showing an error on the console.
     * @param {string} message
     */
    onXMLError(message) {
        console.error("XML Loading Error: " + message);
        this.loadedOk = false;
    }

    /**
     * Callback to be executed on any minor error, showing a warning on the console.
     * @param {string} message
     */
    onXMLMinorError(message) {
        console.warn("Warning: " + message);
    }

    /**
     * Callback to be executed on any message.
     * @param {string} message
     */
    log(message) {
        console.log("   " + message);
    }

    /**
     * Function that processes all nodes, creating the designed scene in the xml file.
     * @param {string} component
     * @param {string} fatherTexture
     * @param {string} fatherMaterial
     * @param {string} fatherAnimation
     * @param {float} len_s
     * @param {float} len_t
     */
    processNodes(component, fatherTexture, fatherMaterial, fatherAnimation, len_s, len_t){

        var vertex = this.components[component];
        if(vertex.components.length == 0){
            var materialID = vertex.getMaterialID();          

            for(var i = 0; i < vertex.primitives.length; i++){
                this.scene.pushMatrix();
                this.scene.multMatrix(vertex.transformations);

                // animation
                if(vertex.animation != null || this.animations[vertex.animation] != undefined){
                    this.animations[vertex.animation].apply();
                }
                else if(fatherAnimation != null){
                    this.animations[fatherAnimation].apply();
                }

                // Checks inheritance in the material and apply the inherited one
                if(vertex.materials.length != 0){
                    if(materialID == "inherit") {
                        materialID = fatherMaterial;
                    }
                    this.materials[materialID].apply();
                }
                // Checks inheritance in the texture and apply the inherited one
                if(vertex.texture != null){
                    if(vertex.texture == "inherit") {
                        vertex.texture = fatherTexture;
                        vertex.l_s = len_s;
                        vertex.l_t = len_t;
                    }
                    this.materials[materialID].setTexture(this.textures[vertex.texture]);
                }
                
                this.primitives[vertex.primitives[i]].display();
                this.scene.popMatrix();   
            }

        }
        else {
            for(var i = 0; i < vertex.components.length; i++){
                var newNode = vertex.components[i];
                var ft = vertex.texture;
                var mat = vertex.getMaterialID(); 
                var length_s = vertex.l_s;
                var length_t = vertex.l_t;


                //References the texture which children should inherit
                if(ft == "inherit") {
                    ft = fatherTexture;
                    length_s = len_s;
                    length_t = len_t;
                }          
                //References the material which children should inherit
                if(mat == "inherit") {
                    mat = fatherMaterial;
                }

                var fa = null;

                if(vertex.animation != null || this.animations[vertex.animation] != undefined){
                    fa = vertex.animation;
                }
                

                this.scene.pushMatrix();
                this.scene.multMatrix(vertex.transformations);
                
                this.processNodes(newNode, ft, mat, fa, length_s, length_t);
                this.scene.popMatrix();
            }
        }
    }
    
    /**
     * Displays the scene, processing each node, starting in the root node.
     */
    displayScene() {
        this.processNodes(this.idRoot);
    }
}
