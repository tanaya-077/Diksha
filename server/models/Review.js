import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        default: "https://randomuser.me/api/portraits/lego/1.jpg"
    }
}, {
    timestamps: true
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;