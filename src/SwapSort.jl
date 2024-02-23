module SwapSort

using JSON, Scanf, Unroll

export swapsort, tuplesort

include("consts.jl")
include("utils.jl")

"""
    swapsort(a...; lt=isless, by=identity)

Sort the arguments, returning a sorted tuple. `lt` and `by` keywords work the same as `Base.sort`. `swapsort` supports up to 64 arguments. See also [`tuplesort`](@ref).
"""
swapsort

"""
    tuplesort(t::Tuple; lt=isless, by=identity)

Return a sorted tuple. `lt` and `by` keywords work the same as `Base.sort`. `tuplesort` calls [`swapsort`](@ref) when there is at most 64 elements and uses merge sort otherwise.
"""
tuplesort

@unroll for para in SORTERS
    @makesorter(MAINPATH * _filename(para...))
    if para ∈ BESTSIZE
        @registersorter(para)
    end
end

end # module
