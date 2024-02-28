using Random
using SwapSort
using Test
using Aqua

@testset "Aqua" begin
    Aqua.test_all(SwapSort)
end

@testset "sorters" begin
    for (N,D,L) in SwapSort.SORTERS
        @testset "swapsort$(N)_$(D)_$(L)" begin
            fun = getproperty(SwapSort, Symbol("swapsort$(N)_$(D)_$(L)"))
            v = collect(1:N)
            for attempts in 1:100
                @test collect(fun(shuffle!(v)...)) == 1:N
            end
        end
    end
end

@testset "tuplesort" begin
    for N in 2:64
        @test tuplesort(Tuple(randperm(N))) == Tuple(1:N)
    end
end

@testset "swapsort" begin
    for N in 2:64
        @test collect(swapsort(randperm(N)...)) == 1:N
    end
end
