require 'rails_helper'

describe "calculator page" do
  it "should calculate the example properly", :js => true do
    visit root_path
    fill_in("input", with: "1 + 2 * 3 / 4")
    click_button('Go')
    expect(page).to have_content "1 + 2 = 3"
    expect(page).to have_content "3 * 3 = 9"
    expect(page).to have_content "9 / 4 = 2.25"
  end
end