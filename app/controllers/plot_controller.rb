require 'gchart'

class PlotController < ApplicationController
  def index
    data = (-Math::PI ... Math::PI).step(0.1).to_a.map {|x| 
      Math.sin(x)
    }
    chart = Gchart.new(
      :type => 'line',
      :size => '300x300',
      :legend => ['sin(x)'],
      :curveType => 'function',
      :axis_with_labels => ['x', 'y'], 
      :axis_range => [[-Math::PI, Math::PI], [-1,1]],
      :data => data, 
      :filename => "tmp/chart.png")

    chart.file

    response.headers['Cache-Control'] = "public, max-age=#{12.hours.to_i}"
    response.headers['Content-Type'] = 'image/png'
    response.headers['Content-Disposition'] = 'inline'

    render :text => open("tmp/chart.png", "rb").read
  end 
end