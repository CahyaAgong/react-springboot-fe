export interface Member {
  id: string
  name: string
  pictureUrl: string
  position: string
  reportsTo: string | null
  userId: string | null
  createdAt: Date
  reportsToName?: string
}

export interface MemberPaginationResponse {
  members: Member[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
}