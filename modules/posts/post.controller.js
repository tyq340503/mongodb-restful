const Post = require('./post.model');

module.exports = {
    createPost: async function (req, res) {
        try {
            console.log({ ...req.body, user: req.user._id });
            //const post = await Post.createPost(req.body, req.user._id);
            const post = await Post.create({ ...req.body, user: req.user._id });
            //return res.status(HTTPStatus.CREATED).json(post);
            return res.status(201).json(post);

        } catch (e) {
            return res.status(400).json(e);
        }
    },
    getPostById: async function (req, res) {
        try {
            const promise = await Post.findById(req.params.id).populate('user');
            //console.log(req.user);
            // const promise = await Promise.all([
            //     User.findById(req.user._id),
            //     //Post.findById(req.params.id).populate('user')
            // ]);
            //console.log(req.params.id);
            //const favorite = promise[0]._favorites.isPostIsFavorite(req.params.id);
            //const post = promise[1];

            // return res.status(HTTPStatus.OK).json({
            //     ...post.toJSON(),
            //     favorite
            // }); 
            return res.status(200).json(promise);
        } catch (e) {
            //return res.status(HTTPStatus.BAD_REQUEST).json(e);
            return res.status(500).json(e);
        }
    },
    getPostsList: async function (req, res) {
        const limit = parseInt(req.query.limit, 0);
        const skip = parseInt(req.query.skip, 0);
        try {
            // const promise = await Promise.all([
            //     User.findById(req.user._id),
            //     Post.list({ limit, skip })
            // ]);
            const promise = await Post.list({ limit, skip });
            // const posts = promise[1].reduce((arr, post) => {
            //     const favorite = promise[0]._favorites.isPostIsFavorite(post._id);

            //     arr.push({
            //         ...post.toJSON(),
            //         favorite
            //     });

            //     return arr;
            // }, []);

            return res.status(200).json(promise);
        } catch (e) {
            return res.status(500).json(e);
        }
    },
    updatePost: async function (req, res) {
        try {
            const post = await Post.findById(req.params.id);
            //console.log(req);
            if (!post.user.equals(req.user._id)) {
                return res.sendStatus(401);
            }
            //update
            Object.keys(req.body).forEach(key => {
                post[key] = req.body[key];
            });

            return res.status(200).json(await post.save());
        } catch (e) {
            return res.status(500).json(e);
        }
    },

} 