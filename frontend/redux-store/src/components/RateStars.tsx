const RateStars = (props: {stars: number}) => {
    const {stars} = props;
    const solveStar = (r:number,n:number) => {	
		if(r >= n){
			return "bi-star-fill";
		}else if(r > (n - 0.5)){
			return "bi-star-half";
		}else{
			return "bi-star";
		}
	}
    return(
        <div className="flex text-green-600 py-2">
			<i className={`bi ${solveStar(stars,1)} mr-1`}/>
			<i className={`bi ${solveStar(stars,2)} mr-1`}/>
			<i className={`bi ${solveStar(stars,3)} mr-1`}/>
			<i className={`bi ${solveStar(stars,4)} mr-1`}/>
			<i className={`bi ${solveStar(stars,5)} mr-1`}/>
        </div>
    )
}
export default RateStars;