import { StatusEnum } from "../../common/interfaces/statusEnum";
import { ContactApi } from "./ContactApi";

export interface ContactState {
    contactData: ContactApi[];
    contactArchivedData: ContactApi[],
    selectedContact: ContactApi | null;
    status: StatusEnum;
    statusArchived: StatusEnum;
    archiveStatus: StatusEnum;
    fetchByIdStatus: StatusEnum;
    archiveError: StatusEnum;
    error: string | undefined;
}
