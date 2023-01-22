import { useState } from "react";
import ReviewModel from "../../models/ReviewModel";

export const ReviewListPage : React.FC<{}> = () => {

    const [reviews, setReviews] =useState<ReviewModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    
    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [reviewsPerPage, setReviewsPerPage] = useState(5);
    const [totalAmountOfReview, setTotalAmountOfReviews] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    

    return(<div></div>);
};