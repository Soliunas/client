import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Forbiden } from "../../components/error/Forbiden";
import { MeistrasTypesTable } from "../../components/meistras-types-table/MeistrasTypesTable";
import { Title } from "../Title";

export function AdminMeistraiTypes() {

  const { role } = useContext(GlobalContext);

    if (role !== "admin") {
      return <Forbiden />;
    }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Title title="Meistras types" uri="/meistras-types/new" />
        </div>
        <div className="col-12"><MeistrasTypesTable /></div>
      </div>
    </div>
  )
}