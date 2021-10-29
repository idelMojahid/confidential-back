export interface DocumentType {
    id?: Number,
    url: string,
    name: string,
    type: string,
    claimId: Number,
    isIndexed: Boolean,
    indexedAt: Date,
    updatedAt?: Date,
    createdAt?: Date,
    isVisible: Boolean
}