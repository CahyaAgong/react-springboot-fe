export interface MemberDTO {
  name: string
  position: string
  reportsTo: string | null
  pictureUrl: string
  userId?: string
}