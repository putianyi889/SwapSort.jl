# to generate results to src/consts.jl

using Scanf
list = readdir("./src/Sorters")
sorters = [@scanf(s, "Sort_%d_%d_%d.json", Int, Int, Int)[2:end] for s in list]
sort!(sorters, by=x->x[3])
sort!(sorters, by=x->x[2])
sort!(sorters, by=x->x[1])
print(sorters)

bestsize = copy(sorters)
for i in length(bestsize):-1:2
    if bestsize[i][1] == bestsize[i-1][1]
        popat!(bestsize, i)
    end
end
print(bestsize)