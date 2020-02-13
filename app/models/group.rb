class Group < ApplicationRecord
  has_many :group_users
  has_many :messages
  has_many :users, through: :group_users
  validates :name, presence: true, uniqueness: true

  def show_last_message
    if (last_message = messages.last).present?
      if last_message.body?
        last_message.body
      else
        '画像が投稿されています'
      end
    else
      'メッセージはありません。'
    end
  end
end
