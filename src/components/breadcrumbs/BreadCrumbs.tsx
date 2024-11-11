import { Link } from 'react-router-dom';
import './breadCrumbs.scss';
import { Typography } from '@mui/material';

interface Breadcrumb {
  title: string;
  link: string | null; // Allowing null for link
}

interface BreadCrumbsProps {
  breadCrumbsArr: Breadcrumb[];
}

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ breadCrumbsArr }) => {
  return (
    <div className='sm-breadCrumbs'>
      {breadCrumbsArr.length > 0 && (
        <Typography className='first-breadcrumb'>{breadCrumbsArr[0].title}</Typography>
      )}
      <div style={{ display: "flex" }}>
        {breadCrumbsArr.slice(1).map((eachBreadCrumb, index) => (
          <div style={{ display: "flex" }} key={index + 1}>
            {eachBreadCrumb.link ? (
              <Link to={eachBreadCrumb.link} className='link-to' style={{ display: "flex" }}>
                <Typography className='link-breadcrumb' variant="h3" sx={{ fontSize: "20px" }}>
                  {eachBreadCrumb.title}
                </Typography>
              </Link>
            ) : (
              <Typography className='link-breadcrumb' variant="h3" sx={{ fontSize: "20px" }}>
                {eachBreadCrumb.title}
              </Typography>
            )}
            {index < breadCrumbsArr.length - 2 && (
              <span className='breadcrumb-slash'>/</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BreadCrumbs;
