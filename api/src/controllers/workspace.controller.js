import Workspace from '../models/workspace.model.js'

export const createWorkspace = async (req,res)=>{
    try {
        const { name, description } = req.body;

        //authenticate User 
        const id = req.params.id;
        if(id !== req.user.id){
            return res.status(400).json({
                success : false,
                message : "Unauthorised"
            })
        }

        const workspace = new Workspace({
          name,
          description,
          owner: req.user.id, 
        });
        await workspace.save();
        res.status(201).json(workspace);
    } catch (error) {
        res.status(500).json({ message: "Error creating workspace" });
    }
}

export const getWorkspaces = async(req,res)=>{
    try {

        //authenticate User 
        const id = req.params.id;
        if(id !== req.user.id){
            return res.status(400).json({
                success : false,
                message : "Unauthorised"
            })
        }

        const workspaces = await Workspace.find({ owner: req.user.id });
        res.json(workspaces);
    } catch (error) {
        res.status(500).json({ message: "Error fetching workspaces" });
    }
}

export const updateWorkspace = async(req,res)=>{
    try {
        const { name, description } = req.body;

        const space = await Workspace.findById(req.params.id)
        //console.log(space)
        //authenticate User 
        const userId = space.owner.toString();
        
        if(userId !== req.user.id){
            return res.status(400).json({
                success : false,
                message : "Unauthorised"
            })
        }
        
        const workspace = await Workspace.findByIdAndUpdate(
          req.params.id,
          { name, description },
          { new: true }
        );
        res.json(workspace);
    } catch (error) {
        res.status(500).json({ message: "Error updating workspace" });
    }
}

export const deleteWorkspace = async(req,res)=>{
    try {

        const space = await Workspace.findById(req.params.id)
        const userId = space.owner.toString();
        //authenticate User 
        
        if(userId !== req.user.id){
            return res.status(400).json({
                success : false,
                message : "Unauthorised"
            })
        }

        await Workspace.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Workspace deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting workspace" });
    }
}