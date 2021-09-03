import { useEffect, useState } from "react";
import MainMenu from "./components/MainMenu";
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport, GridValueGetterParams } from '@material-ui/data-grid';



interface OrderDetails {
    id: number, 
    name: string,
    phone: string, 
    address: string, 
    itemName: string, 
    date: string, 
    inventoryCode: string , 
    takenBy: string, 
    takenByAddress: string, 
    takenByPhone: string,
    returnedAt: string,
}


async function getOrders(): Promise<OrderDetails[]> {
    const response = await fetch('/api/getarchive', {
        method: 'GET'
    });
    if (!response.ok){
      throw new Error('Failed to fetch.' + response.statusText);
    }
    return await response.json();
  }

export default function Arhiva(){

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 100},
        {
            field: 'name',
            headerName: 'Ime',
            width: 150,
        },{
            field: 'phone',
            headerName: 'Broj',
            width: 150,
        },{
            field: 'address',
            headerName: 'Adresa',
            width: 150,
        },{
            field: 'itemName',
            headerName: 'Uređaj',
            width: 150,
        },{
            field: 'date',
            headerName: 'Datum',
            width: 100,
        },{
            field: 'inventoryCode',
            headerName: 'Šifra',
            width: 100,
        },{
            field: 'takenBy',
            headerName: 'Preuzeo',
            width: 150,
        },{
            field: 'takenByPhone',
            headerName: 'Broj',
            width: 150,
        },{
            field: 'takenByAddress',
            headerName: 'Adresa',
            width: 300,
        },{
            field: 'returnedAt',
            headerName: 'Datum Vraćanja',
            width: 100,
        }
    ]


    const [orders, setOrders] = useState<OrderDetails[]>([]);
    useEffect(() => {
        getOrders().then(setOrders);
    }, []);
    return(
        <div className="w-full flex p-5 flex-col h-screen">
            <div className="flex w-full items-center">
            <div className="flex-1"></div>
            <MainMenu currentPage="archive" />
            </div>
            <div className="w-full pt-15 p-5 flex flex-col justify-center items-center">
                <h1 className="text-3xl font-semibold">Arhiva</h1>
            </div>
            
            <div className="w-full flex-1">
                <DataGrid
                    rows={orders}
                    columns={columns}
                    pageSize={10}
                    components={{
                        Toolbar: CustomToolbar,
                      }}
                    disableSelectionOnClick
                />
            </div>
            
        </div>
    )

}
function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport title="export" />
      </GridToolbarContainer>
    );
  }
