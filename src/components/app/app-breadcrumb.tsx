import { Fragment } from "react/jsx-runtime";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "../ui/breadcrumb";
import { Link, useMatches, type To, type UIMatch } from "react-router";

type BreadcrumbLink = {
  title: string;
  to: string | To;
};

export default function AppBreadcrumb() {
  const matches = useMatches() as UIMatch<unknown, { breadcrumb?: string }>[];

  // Filter out root path
  const breadcrumbs = matches.filter((match) => {
    const path = match.pathname;
    return path !== "/" && !path.endsWith("/");
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((match, index) => {
          const last = index === breadcrumbs.length - 1;
          const name =
            match.handle?.breadcrumb || match.pathname.split("/").pop();

          return (
            <Fragment key={match.pathname}>
              <BreadcrumbItem key={match.pathname}>
                {last ? (
                  <BreadcrumbPage className="capitalize">{name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={match.pathname} className="capitalize">
                      {name}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!last && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
