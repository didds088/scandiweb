import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function SkeletonCard() {

    return (
        Array(6).fill(0).map((index) => 
            <SkeletonTheme key={index} baseColor="#d3d3d3" highlightColor="#b4adad">
            <div className="col-6 col-md-4">
            <div className="tab border-0">
            <div className="title">
            <p className='skeletonCheck'><Skeleton width={15} height={15} /></p>
            </div>
            <div className="product-items">
            <p><Skeleton width={80} /></p>
            <p><Skeleton width={100} /></p>
            <p><Skeleton width={80} /></p>
            <p><Skeleton width={100} /></p>
            </div>
            </div>
            </div>
            </SkeletonTheme>
        )
    )
}