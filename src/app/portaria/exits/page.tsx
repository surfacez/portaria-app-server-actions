import { getGuestsInside } from "@/api/guests";
import { ExitGuestDataTable } from "./_components/ExitGuestsDataTable";
import { columns } from "./_components/ExitGuestsColumn";
import { Header } from "@/components/Header";
import { format } from "date-fns";
export default async function ExitsPage() {
  const guestsInside = await getGuestsInside();

  const formattedGuestsInside = guestsInside.map((guest) => {
    const month = guest.entryDate.getMonth() + 1;
    const day = guest.entryDate.getDate();
    const year = guest.entryDate.getFullYear();
    const hour = guest.entryHour;
    const plate = guest.plate ? guest.plate : " Passante";
    const apartment = guest.apartment ? guest.apartment.toString() : "-";
    const id = guest.id;

    return {
      id,
      nome: guest.name,
      dataDeEntrada: format(
        new Date(`${year}/${month}/${day} ${hour}`),
        "yyy/MM/dd HH:mm"
      ),
      placa: plate,
      apartamento: apartment,
    };
  });

  return (
    <div>
      <Header
        title="Cadastrar saída"
        subtitle="Lista de hóspedes que estão dentro do hotel"
      />
      <div className="container mx-auto">
        <ExitGuestDataTable
          columns={columns}
          data={formattedGuestsInside}
          acessorKey="nome"
          headerLabel="nome"
          acessorKey2="placa"
          headerLabel2="placa"
          acessorKey3="dataDeEntrada"
          headerLabel3="data de entrada"
          acessorKey4="apartamento"
          headerLabel4="apartamento"
        />
      </div>
    </div>
  );
}