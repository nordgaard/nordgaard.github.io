# Given list of integers, find the higest product from the 3 integers

list_of_ints = [1,4,45,2,100,23]
#Multiply the three numbers
#Get Highest product
top_three = []
3.times do 
	top_three << list_of_ints.sort!.pop
end
puts top_three.inject(:*)

# return highest_product