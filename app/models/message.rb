class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user
  # imageカラムが空の場合、bodyカラムも空であれば保存しない
  validates :body, presence: true, unless: :image?

  mount_uploader :image, ImageUploader
end
